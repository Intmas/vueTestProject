export default {
  state: {
    users:[
      {"name":"Nbnhn","pass":"9j1uszwe","dateOfBirth":1022198400000,"email":"Nbnhn0@mail.auto"},
    ],
    selectedUsers: [],
  },
  mutations: {
    setUsersArr(state, usersArr) {
      state.users = usersArr
    },
    addUser(state, user) {
      state.users.push(user);
    },
    setSelected(state, selected) {
      state.selectedUsers = selected
    },
    clearSelection(state) {
      state.selectedUsers = []
    }
  },
  actions: {},
  getters: {
    users(state) {
      return state.users
    },
    selectedUsers(state) {
      return state.selectedUsers
    },
    selectedUsersLength(state) {
      return state.selectedUsers.length
    },
  },
}
