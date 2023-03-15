<template>
 <div>
   <h2 v-if="selectedUser.length === 0">New users</h2>
   <h2 v-else>Edit users</h2>
   <h5>Input data of user</h5>
   <form class="user-form">
     <label>Name</label>
     <input
       type="name"
       class="form-control"
       :class="{'is-invalid': $v.name.$error}"
       @blur="$v.name.$touch()"
       v-model="name"
     >
     <div class="invalid-feedback" v-if="!$v.name.required" >Name field is required</div>
     <div class="invalid-feedback" v-if="!$v.name.alpha">Name field should be allow only alpha</div>
     <div class="invalid-feedback" v-if="!$v.name.minLength">Min length of name is {{ $v.name.$params.minLength.min }}. Now it is {{ name.length }}</div>
     <label>Pass</label>
     <input
       type="password"
       class="form-control"
       :class="{'is-invalid': $v.password.$error}"
       @blur="$v.password.$touch()"
       v-model="password"
     >
     <div class="invalid-feedback" v-if="!$v.password.required" >Password field is required</div>
     <div class="invalid-feedback" v-if="!$v.password.minLength">Min length of password is {{ $v.password.$params.minLength.min }}. Now it is {{ password.length }}</div>

     <label>Date of birth</label>
       <input
         type="date"
         class="form-control"
         v-model="dateOfBirth"
         pattern="\d{4}:\d{2}:\d{2}"
         lang="ru-Ru"
       >
     <label> Email</label>
     <input
       type="email"
       class="form-control"
       :class="{'is-invalid': $v.validatedEmail.$error}"
       @blur="$v.validatedEmail.$touch()"
       v-model="validatedEmail"
     >
     <div class="invalid-feedback" v-if="!$v.validatedEmail.required" >Email field is required</div>
     <div class="invalid-feedback" v-if="!$v.validatedEmail.email" >This field should be an email</div>

     <button
       class="btn btn-outline-secondary my-2"
       :disabled="$v.$invalid"
       v-if="selectedUser.length === 0"
       @click.prevent="createNewUser"
     >Save Information
     </button>

     <button
       class="btn btn-outline-secondary my-2"
       v-if="selectedUser.length === 0"
       @click.prevent="fillNewUser(5)"
     >Fill in the fields
     </button>

     <button
       class="btn btn-outline-secondary my-2"
       v-else
       :disabled="$v.$invalid"
       @click.prevent="editUser"
     >Edit Information
     </button>

     <button
       class="btn btn-outline-secondary my-2"
       @click.prevent="cancelHandler"
     >Cancel
     </button>
   </form>
 </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength, alphaNum } from 'vuelidate/lib/validators'

export default {
  props: ['usersArr'],
  data() {
    return {
      date: new Date(),
      name: '',
      validatedEmail: '',
      password: '',
      user: {},
      position: '',
      selectedUser: [],
      dateOfBirth: {},
      timestamp: 0,
      id: 0,
      currYear: new Date().getFullYear()
    }
  },
  mixins: [validationMixin],
  validations: {
    validatedEmail: {
      required,
      email,
      unique: function (newEmail) {
        return this.usersArr.find(user => user.mail === newEmail) === undefined
      }
    },
    password: {
      required,
      minLength: minLength(8)
    },
    name: {
      required,
      minLength: minLength(2),
      alphaNum
    }
  },
  methods: {
    cancelHandler(){
      this.clearForm()
      this.$eventBus.$emit("handlerСanceled")
    },
    clearForm(){
      this.name = ''
      this.validatedEmail = ''
      this.password = ''
      this.dateOfBirth = ''
      this.user = {}
      this.position = ''
      this.selectedUser = []
      this.$v.$reset()
    },
    createNewUser: function () {
      this.setUserInfo()
      this.id++
      this.$eventBus.$emit("addFormSubmitted", this.user)
      this.clearForm()
      this.$toasted.success('User added!')
    },
    editUser: function () {
      this.setUserInfo()
      this.$eventBus.$emit("editFormSubmitted", this.user, this.position)
      this.$toasted.success('User edited!')
      this.cancelHandler()
    },
    setUserInfo(){
      this.user = {}
      this.user.name = this.name
      this.user.pass = this.password
      //
      this.user.dateOfBirth = this.dateOfBirth
      this.user.email = this.validatedEmail
    },
    setOldInfo(selectedUser) {
      this.selectedUser = selectedUser
      this.position = this.usersArr.findIndex(user => user.name === selectedUser[0])
      this.user = this.usersArr[this.position]
      this.name = this.user.name
      this.password = this.user.pass
      this.dateOfBirth = this.user.dateOfBirth
      this.validatedEmail = this.user.email
    },
    fillNewUser(numberOfChar, age){
      if(age === undefined) {
        age = ['14', '65']
      }
      // get parameter generation
      //name and password
      this.name = 'N'
      for (let i = 0; i < numberOfChar; i++) {
        this.name += String.fromCharCode(Math.floor((Math.random() * (25+1))+97))
      }
      this.password = Math.random().toString(36).slice(-8);
      this.validatedEmail = this.name + this.id + "@mail.auto"

      //date of birth
      let amountOfDay = 30
      let dd = ''
      let m31 = [1, 3, 5, 7, 8, 10, 12]
      let mm = (Math.floor((Math.random() * (12+1))+1))
      if(mm === 2) {
        amountOfDay = 28
      } else {
        if(m31.find(el => el === mm)) {
          amountOfDay = 31
        }
      }
      dd = (Math.floor((Math.random() * amountOfDay)+1))
      let yyyy = this.currYear - Math.floor(Math.random() * (parseInt(age[1]) + 1 - parseInt(age[0])) + parseInt(age[0]));
      let generatedDate = new Date(yyyy, mm-1, dd)
      this.dateOfBirth = Date.parse(generatedDate)
      console.log("%%% ", generatedDate)
    },
    createAutoNewUser(params){
      let age = params.ageRange.split(" ")
      for (let i = 0; i < params.amount; i++) {
        this.fillNewUser(params.numberOfChar, age)
        this.createNewUser()
        this.cancelHandler()
      }
    },
  },
  mounted() {
    this.$eventBus.$on('selectedUser', (selectedUser) => {
      if (selectedUser.length) this.setOldInfo(selectedUser)
    })

    this.$eventBus.$on('usersGenerated', (params) => {
      this.createAutoNewUser(params);
    })
  },
}
</script>

<style scoped>

form {
  padding: 10px;
  background: #eaf7fd;
  border-radius: 10px;
}

input {
  margin: 3px;
}
</style>
