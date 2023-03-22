<template>
  <div class="container">
    <h1>Welcome!</h1>
    <h3>Когда-то тут может быть трекер задач</h3>
    <i class="bi bi-bell"></i>
  </div>
</template>

<script>
import {API} from "../api";
export default{
  name: "Home",
  mounted() {
    console.log("response.data")
    API.get('/data.json').then( response => {console.log(response.data)}).catch(error => {console.log(error)});
    console.log("response.data")
  }
}
</script>

<style scoped>

h1 {
  margin: 10px;
}
</style>
