<template>
 <div>
  <h2 v-if="selectedUser.length === 0">New users</h2>
  <h2 v-else>Edit users</h2>
   <h5>Input data of user</h5>

   <form>
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
     >

     <label for="email"> Email</label>
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
       @click.prevent="createNewUser"
     >Save Information
     </button>
     <button
       class="btn btn-outline-secondary my-2"
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

   <div v-if="userAddedToast" class="position-fixed bottom-0 right-0 p-3" style="z-index: 5; right: 0; bottom: 0;">
     <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true" data-delay="2000">
       <div class="toast-header">
           <span aria-hidden="true">&times;</span>
         </button>
       </div>
       <div class="toast-body alert alert-success" role="alert">
         User has been added!
       </div>
     </div>
   </div>
 </div>
</template>



<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength, alpha } from 'vuelidate/lib/validators'

export default {
  props: ['usersArr', 'selectedUser'],
  data() {
    return {
      name: '',
      validatedEmail: '',
      password: '',
      dateOfBirth: '',
      user: {},
      position: '',
      userAddedToast: false
    }
  },
  mixins: [validationMixin],
  validations: {
    validatedEmail: {
      required,
      email,
      unique: function (newEmail) {
        return this.usersArr.find(user => user.mail == newEmail) == undefined
      }
    },
    password: {
      required,
      minLength: minLength(8)
    },
    name: {
      required,
      minLength: minLength(2),
      alpha
    }
  },
  methods: {
    createNewUser(){
      console.log('ssdsdsdadasasds ')
      this.userAddedToast = true
      this.setUserInfo()
      this.$eventBus.$emit("addFormSubmitted", this.user)
    },
    editUser(){
      console.log('ssdsdasds ')
      this.userAddedToast = true
      this.setUserInfo()
      this.$eventBus.$emit("editFormSubmitted", this.user, this.position)
    },
    cancelHandler(){
      this.$eventBus.$emit("handlerСanceled")
    },
    setUserInfo(){
      this.user = {}
      this.user.name = this.name
      this.user.pass = this.password
      this.user.dateOfBirth = this.dateOfBirth
      this.user.email = this.validatedEmail
    },
    setOldInfo() {
      this.position = this.usersArr.findIndex(user => user.name === this.selectedUser[0])
      this.user = this.usersArr[this.position]
      this.name = this.user.name
      this.password = this.user.pass
      this.dateOfBirth = this.user.dateOfBirth
      this.validatedEmail = this.user.email
    }
  },
  mounted(){
    this.$eventBus.$on('editUser', () => {
      this.setOldInfo()
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
