<template>
  <div>
  <add-user :user="user"></add-user>

  </div>
</template>

<script>
import AddUser from "./AddUser.vue";
export default {
  props: ['usersArr', 'user', 'editFlag'],
  components: {

  },
}
</script>

<style scoped>

</style>
