<template>
  <div>
      <ul class="list-group list-group-flush">
        <li class="list-group">
          <div class="list">
            <div class="centerEl">Select</div>
            <div >Name</div>
            <div>Date of birth</div>
            <div>Email</div>
          </div>
        </li>
        <li
          class="list-group"
          v-for="user in usersArr"
        >
          <div class="list">
            <div class="centerEl"><input class="form-check-input" type="checkbox" :value="user.name" v-model="selectedUsers"></div>
            <div>{{ user.name }}</div>
            <div>{{ user.dateOfBirth }}</div>
            <div>{{ user.email }}</div>
          </div>
        </li>
      </ul>
  </div>
</template>

<script>

export default {
  props: ['usersArr'],
  name: "UsersList",
  data() {
    return {
      selectedUsers: [],
    }
  },
  mounted() {
    this.$eventBus.$on('callDeleteUser', () => {
      this.usersDelete()
    })
  },
  methods: {
    usersDelete() {
      for (let nameDel of this.selectedUsers) {
        let position = this.usersArr.findIndex(user => user.name === nameDel)
        this.usersArr.splice(position, 1)
      }
      this.selectedUsers = []
      //return true
    },
  },
  watch: {
    selectedUsers: function (newVal){
      console.log(newVal)
      this.$emit('getSelectedUser', newVal)
    },
  },
}
</script>

<style scoped>
div {
  margin: 10px;
}

input {
  margin: 2px;
}

.list {
  display: grid;
  grid-template-columns:  70px repeat(3, 150px);
  background: #eaf7fd;
  border-radius: 5px;
}

.centerEl {
  text-align: center;
}
</style>
