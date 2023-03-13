export default {
  data() {
    return {
      props: ['usersArr'],
      searchName: '',
      position: 0
    }
  },
  computed: {
    searchNames() {
      //console.log(this.usersArr.find(user => user.name === this.searchName))
      let findUser = this.usersArr.find(user => user.name === this.searchName)
      this.position = this.usersArr.findIndex(user => user.name === this.searchName)
      return findUser
    }
  }
}
