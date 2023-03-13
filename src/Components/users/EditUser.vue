<template>
  <div>
    <h2>Update user info</h2>
    <hr>
    <div class="container">
    <form>
      <div class="form-group row">
        <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input type="email" class="form-control" id="inputEmail3">
        </div>
      </div>
      <div class="form-group row">
        <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" id="inputPassword3">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-10">
          <button type="submit" class="btn btn-primary">Sign in</button>
        </div>
      </div>
    </form>
    </div>
    <hr>

<!--    <h4>Input user name</h4>-->
<!--    <input type="text" v-model="searchName">-->
<!--    <button class="btn btn-light" @click="userShow(searchNames)">Search</button>-->
    <form v-show="formShow">
      <input type="text"  v-model="user.name">
      <input type="text"  v-model="user.pass">
      <input type="text"  v-model="user.age">
      <input type="text"  v-model="user.mail">
      <button class="btn btn-light" @click="userUpdate">Update info</button>
    </form>
  </div>
</template>

<script>
// import SearchMixin from "../../SearchMixin";
export default {
  // mixins: [SearchMixin],
  props: ['usersArr'],
  data() {
    return {
      formShow: true,
      user: {
        name: '',
        pass: '',
        age: 0,
        mail:'',
      },
    }
  },
  methods: {
    userShow(user) {
      this.user = user
      this.formShow = true
    },
    userUpdate() {
      event.preventDefault()
      console.log(this.user)
      let position = this.usersArr.findIndex(user => user.name === this.searchName)
      console.log(position)
      this.usersArr[position] = this.user
      console.log(this.usersArr)
      //this.$emit('userUpdated', this.usersArr)
    }
  }
}
</script>

<style scoped>
div {
  margin: 10px;
}
input {
  margin: 2px;
}
</style>
