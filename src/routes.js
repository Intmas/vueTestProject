import VueRouter from 'vue-router';
import Home from './pages/home.vue'
import AddUser from "./Components/users/UserForm.vue";
import EditUser from "./Components/users/ModalAdminMenu.vue";
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
