import VueRouter from 'vue-router';
import Home from './pages/home.vue'
import AddUser from "./Components/users/AddUser.vue";
import EditUser from "./Components/users/EditUser.vue";
import UsersList from "./Components/users/UsersList.vue";
import UsersComponentShell from "./Components/users/UsersComponentShell.vue";

export default new VueRouter({
    routes: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/users',
        component: UsersComponentShell
      },
    ],
    mode: 'history'
  }

)
