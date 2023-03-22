<template>
<div class="container">
  <modal-admin-menu></modal-admin-menu>
  <user-form v-show="!showMenuBtn"></user-form>
  <users-list v-show="showMenuBtn"></users-list>
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
      users:[
        {"name":"Nbnhn","pass":"9j1uszwe","dateOfBirth":1022198400000,"email":"Nbnhn0@mail.auto"},
      ],
      user: {},
      position: '',
      showMenuBtn: true,
      deleteMode: false,
      amountUsers: 0,
    }
  },
  methods: {
    gotoAddUserForm(){
      this.$eventBus.$emit('selectedUser', '')
      this.showMenuBtn = false;
    },
    gotoEditUserForm(){
      this.position = this.usersArr.findIndex(user => user.name === this.selectedUsers[0])
      this.$eventBus.$emit('selectedUser', this.usersArr[this.position])
      this.showMenuBtn = false;
    },
    gotoUserList(){
      this.clearSelection()
      this.showMenuBtn = true
    },
    addUser(user){
      this.usersArr.push(user)
      localStorage.setItem('users', JSON.stringify(this.usersArr))
    },
    editUser(user){
      console.log(Object.keys(this.user))
      this.usersArr[this.position].name = user.name
      this.usersArr[this.position].pass = user.pass
      this.usersArr[this.position].dateOfBirth = user.dateOfBirth
      this.usersArr[this.position].email = user.email
    },
    deleteUser(){
      for (let nameDel of this.selectedUsers) {
        let position = this.usersArr.findIndex(user => user.name === nameDel)
        this.usersArr.splice(position, 1)
      }
      this.$store.commit('clearSelection')
      this.$eventBus.$emit('selectionCleared')
    },
    clearSelection(){
      this.$store.commit('clearSelection')
      this.$eventBus.$emit('selectionCleared')
    },
    getSelectedUsers(selectedUser) {
      this.$store.commit('setSelected', selectedUser)
    },
  },
  computed: {
    usersArr: {
      get() {
        return this.$store.getters.users
      },
      set(value) {
        this.$store.commit('setUsersArr', value)
      }
    },
    selectedUsers() {
        return this.$store.getters.selectedUsers
    },
    selectedUsersLength() {
      return this.$store.getters.selectedUsersLength
    },
  },
  watch: {
    usersArr() {
      this.$eventBus.$emit('getUsersArr', this.usersArr)
    },
  },
  created() {
    this.$store.commit('setUsersArr', this.users)
    this.$store.commit('clearSelection', this.selectedUser)
    document.addEventListener('keydown', (event) =>{
      if(event.altKey && event.code === "KeyX") {
        this.$eventBus.$emit('showModal')
        event.preventDefault();
      }
    });
  },
  mounted() {
    this.$eventBus.$on('handlerСanceled', () => {
      this.gotoUserList();
    })
    this.$eventBus.$on('addFormSubmitted', (user) => {
      this.addUser(user);
    })
    this.$eventBus.$on('editFormSubmitted', (user) => {
      this.editUser(user);
    })
    this.$eventBus.$on('getSelectedUser', (selectedUser) => {
      this.getSelectedUsers(selectedUser);
    })
  },
}
</script>

<style scoped>
</style>
