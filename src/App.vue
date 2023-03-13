<template>
  <div>
    <nav class="container navbar navbar-expand-lg bg-body-tertiary">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav nav-item">
          <router-link
            tag="li"
            exact to="/"
            active-class="active">
            <a class="nav-link">Home</a>
          </router-link>
          <router-link
            tag="li"
            exact to="/users"
            active-class="active">
            <a class="nav-link">Party keeper</a>
          </router-link>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.bi {
  font-size: 25px;
}

.navbar-expand-lg {
  padding-left: 0px;
}

p {
  white-space: pre;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: cornflowerblue;
}

input {
  margin: 2px;
}

</style>
