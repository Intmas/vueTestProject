<template>
  <div>
    <h2>User list</h2>
      <span>select one user to edit</span><br>
      <span>select one or more users to delete</span>

    <ul class="list-group list-group-flush">
      <li class="list-group">
          <div class="list">
            <div class="centerEl">Select</div>
            <div >Name</div>
            <div>Date of birth</div>
            <div>Email</div>
          </div>
        </li>
      <li class="list-group" v-for="user in currUsers">
        <div class="list">
          <div class="centerEl"><input class="form-check-input" type="checkbox" :value="user.name" v-model="selectedUsers"></div>
          <div>{{ user.name }}</div>
          <div>{{ user.dateOfBirth }}</div>
          <div>{{ user.email }}</div>
        </div>
      </li>
    </ul>
    <div class="pagerBox">
      <button class="btn btn-info" @click="prevPage" :disabled="currPage == 0"><</button>
      <button @click="nextPage" :disabled="currPage >= amountUsers/recordQuantity-1" class="btn btn-info">></button>
      <span>Record on the page: </span>
      <input type="radio" class="radio" @click="backToFirstPage" v-model="recordQuantity" :value="5">
      <label>5</label>
      <input type="radio" class="radio" @click="backToFirstPage" v-model="recordQuantity" :value="10">
      <label>10</label>
      <input type="radio" class="radio" @click="backToFirstPage" v-model="recordQuantity" :value="15">
      <label>15</label>
      <input type="radio" class="radio" @click="backToFirstPage" v-model="recordQuantity" :value="20">
      <label>20</label>
      <label>
        <input type="radio" class="radio" @click="backToFirstPage" v-model="recordQuantity" :value="40">
        40
      </label>
      <input id="valPerPage50" type="radio" class="radio" @click="backToFirstPage" v-model="recordQuantity" :value="50">
      <label for="valPerPage50">50</label>
    </div>
  </div>
</template>

<script>

export default {
  props: ['usersArr'],
  name: "UsersList",
  data() {
    return {
      selectedUsers: [],
      amountUsers: 0,
      currPage: 0,
      recordQuantity: 5,
      currUsers: [],
    }
  },
  methods: {
    deleteUsers() {
      for (let nameDel of this.selectedUsers) {
        let position = this.usersArr.findIndex(user => user.name === nameDel)
        this.usersArr.splice(position, 1)
      }
      this.selectedUsers = []
    },
    prevPage(){
      this.currPage--
      this.toTop()
    },
    nextPage(){
      this.currPage++
      this.toTop()
    },
    backToFirstPage(){
      this.currPage = 0
      this.toTop()
    },
    toTop() {
      setTimeout(() => {
        window.scrollTo({
          top: 155,
          behavior: "smooth"
        })
      }, 1000)

    },
  },
  computed: {
    getAmountUsers() {
      return this.usersArr.length
    },
    getCurrUsers(){
      console.log(this.currPage*this.recordQuantity, ' ', this.currPage*this.recordQuantity + this.recordQuantity )
      let start = this.currPage*this.recordQuantity
      return this.usersArr.slice(start, start + this.recordQuantity)
    }
  },
  watch: {
    selectedUsers(selectedUsers) {
      this.$eventBus.$emit('getSelectedUser', selectedUsers)
    },
    usersArr(){
      this.amountUsers = this.getAmountUsers
      this.currUsers = this.getCurrUsers
    },
    currPage(){
      this.currUsers = this.getCurrUsers
    },
    recordQuantity(){
      this.currUsers = this.getCurrUsers
    }
  },
  mounted() {
    this.$eventBus.$on('callDeleteUser', () => {
      this.deleteUsers()
    })
    this.$eventBus.$on('selectionCleared', () => {
      this.selectedUsers = []
    })
  },
  created() {
    this.amountUsers = this.getAmountUsers
    this.currUsers = this.getCurrUsers
    console.log(this.currUsers)
  },
}
</script>

<style scoped>
div {
  margin: 10px 10px 10px 0px;
}

input {
  margin: 2px;
}

.list {
  display: grid;
  grid-template-columns:  70px repeat(3, 150px);
  background: #eaf7fd;
  border-radius: 5px;

  margin-left: 0px;
}

.list-group {
  margin-left: 0px;
}

.list-group-flush {
  margin-left: 0px;
}

.centerEl {
  text-align: center;
}

.radio {
  accent-color: #17a2b8;
}

.pagerBox label {
  cursor: pointer;
}

</style>
