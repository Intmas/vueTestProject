<template>
<div class="container">
  <modal-admin-menu></modal-admin-menu>
  <user-form v-show="!showMenuBtn" :usersArr="usersArr"></user-form>
  <users-list v-show="showMenuBtn" :usersArr="usersArr"></users-list>
  <div class="row">
    <div class="col">
      <button v-show="showMenuBtn" type="button" @click="gotoAddUserForm" class="btn btn-success">Add user</button>
      <button v-show="showMenuBtn" type="button" @click="gotoEditUserForm" :disabled="selectedUsersLength !== 1" class="btn btn-info">Edit user</button>
      <button v-show="showMenuBtn" type="button" @click="clearSelection" :disabled="selectedUsersLength === 0" class="btn btn-info">Clear selection</button>
      <button v-show="showMenuBtn" type="button" @click="deleteUser" :disabled="selectedUsersLength === 0" class="btn btn-danger">Delete user</button>
    </div>
  </div>
</div>
</template>

<script>
import UsersList from "./UsersList.vue";
import UserForm from "./UserForm.vue";
import ModalAdminMenu from "./ModalAdminMenu.vue";
export default {
  name: "UsersComponentShell",
  components: {
    ModalAdminMenu,
    UsersList,
    UserForm
  },
  data() {
    return {
      usersArr: '',
      usersCopy: [
      {name: 'Владислав', dateOfBirth: '17-08-2001', pass: 'Tr54*3_eF', email: 'sdf@mail.com'},
      {name: 'Андрей', dateOfBirth: '08-12-2000', pass: 'Tsaf*3_eF', email: 'asdx15@mail.com'},
      {name: 'Ольга', dateOfBirth: '15-07-1986', pass: 'Tsaasdwf*3_eF', email: 'as15@mail.com'},
      {name: 'Наталья', dateOfBirth: '24-12-1999', pass: 'Tsafyt*3_eF', email: 'ddfx15@mail.com'},
      {name: 'Евгений', dateOfBirth: '04-10-1997', pass: 'Tsasf*3_eF', email: 'ascfe@mail.com'},
    ],
      user: {},
      showMenuBtn: true,
      deleteMode: false,
      selectedUser: [],
      amountUsers: 0,
    }
  },
  methods: {
    gotoAddUserForm(){
      this.$eventBus.$emit('selectedUser', [])
      this.showMenuBtn = false;
    },
    gotoEditUserForm(){
      this.$eventBus.$emit('selectedUser', this.selectedUser)
      this.showMenuBtn = false;
    },
    gotoUserList(){
      this.clearSelection()
      this.selectedUser = []
      this.showMenuBtn = true
    },
    addUser(user){
      this.usersArr.push(user)
      localStorage.setItem('users', JSON.stringify(this.usersArr))
    },
    editUser(user, position){
      console.log(Object.keys(this.usersArr))
      console.log(Object.keys(this.user))
      this.usersArr[position].name = user.name
      this.usersArr[position].pass = user.pass
      this.usersArr[position].dateOfBirth = user.dateOfBirth
      this.usersArr[position].email = user.email
      localStorage.setItem('users', JSON.stringify(this.usersArr))
    },
    deleteUser(){
      console.log("delete user ")
      this.$eventBus.$emit('callDeleteUser')
    },
    clearSelection(){
      this.selectedUser = []
      this.$eventBus.$emit('selectionCleared')
    },
    getSelectedUsers(selectedUser) {
      this.selectedUser = selectedUser
    },
  },
  computed: {
    selectedUsersLength(){
      return this.selectedUser.length
    },
  },
  created() {
    document.addEventListener('keydown', (event) =>{
      if(event.altKey && event.code === "KeyX") {
        this.$eventBus.$emit('showModal')
        event.preventDefault();
      }
    });
    this.usersArr = JSON.parse(localStorage.getItem('users'))
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
    this.$eventBus.$on('getSelectedUser', (selectedUser) => {
      this.getSelectedUsers(selectedUser);
    })
  },
}
</script>

<style scoped>
</style>
