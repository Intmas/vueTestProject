<template>
<div class="container">
  <add-user v-show="!showBtn" :usersArr="usersArr" :selectedUser="selectedUser"></add-user>
  <users-list  v-show="showBtn" :usersArr="usersArr" @getSelectedUser="selectedUser = $event"></users-list>
  <div class="row">
    <div class="col">
      <button v-show="showBtn" type="button" @click="gotoAddUserPage" class="btn btn-success">Add user</button>
      <button v-show="showBtn" type="button" @click="gotoEditUserPage" class="btn btn-info rightTextColor">Edit user</button>
      <button v-show="showBtn" type="button" @click="openList" class="btn btn-info rightTextColor2">Users list</button>
      <button v-show="showBtn" type="button" @click="deleteUser" class="btn btn-danger">Delete user</button>
    </div>
  </div>
  <span>select one user to edit</span><br>
  <span>select one or more users to delete</span>
</div>
</template>

<script>
import EditUser from "./EditUser.vue"
import UsersList from "./UsersList.vue";
import AddUser from "./AddUser.vue";
export default {
  name: "UsersComponentShell",
  components: {
    EditUser,
    UsersList,
    AddUser
  },
  data() {
    return {
      usersArr: [
        {name: 'Владислав', dateOfBirth: '17-08-2001', pass: 'Tr54*3_eF', email: 'sdf@mail.com'},
        {name: 'Андрей', dateOfBirth: '08-12-2000', pass: 'Tsaf*3_eF', email: 'asdx15@mail.com'},
        {name: 'Ольга', dateOfBirth: '15-07-1986', pass: 'Tsaasdwf*3_eF', email: 'as15@mail.com'},
        {name: 'Наталья', dateOfBirth: '24-12-1999', pass: 'Tsafyt*3_eF', email: 'ddfx15@mail.com'},
        {name: 'Евгений', dateOfBirth: '04-10-1997', pass: 'Tsasf*3_eF', email: 'ascfe@mail.com'},
      ],
      user: {},
      showBtn: true,
      addMode: false,
      editMode: false,
      deleteMode: false,
      selectedUser: '',
    }
  },
  methods: {
    gotoAddUserPage(){
      console.log("goto addUserPage ")
      this.selectedUser = ''
      this.showBtn = false;
    },
    gotoUserList(){
      this.showBtn = true
    },
    addUser(user){
      console.log("add user ", user)
      this.usersArr.push(user)
    },
    editUser(user, position){
      console.log("add user ", user)
      this.usersArr.push(user)
    },
    gotoEditUserPage(){
      console.log("edit user ")
      console.log(this.selectedUser)
      this.$eventBus.$emit('editUser')
      this.showBtn = false;
    },
    openList(){
      console.log("open list of user ")
      this.editMode = false;
      this.addMode = false;
    },
    deleteUser(){
      console.log("delete user ")
      this.$eventBus.$emit('callDeleteUser')
    },
  },
  mounted() {
    this.$eventBus.$on('handlerСanceled', () => {
      this.gotoUserList();
    })
    this.$eventBus.$on('addFormSubmitted', (user) => {
      this.addUser(user);
    })
    this.$eventBus.$on('editFormSubmitted', (user, position) => {
      this.editUser(user, position);
    })
  }
}
</script>

<style scoped>

</style>
