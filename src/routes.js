import VueRouter from 'vue-router';
import Home from './pages/home.vue'
import AddUser from "./components/users/UserForm.vue";
import EditUser from "./components/users/ModalAdminMenu.vue";
import UsersList from "./components/users/UsersList.vue";
import UsersComponentShell from "./components/users/UsersComponentShell.vue";

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
