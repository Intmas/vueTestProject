import Vue from 'vue'
import Vuelidate from '@vuelidate/core'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from "./routes";
import Toasted from 'vue-toasted';
import 'vue-toast-notification/dist/theme-sugar.css';


Vue.prototype.$eventBus = new Vue();

Vue.use(Toasted, {
  duration: 2000,
  position: 'bottom-left',
  theme: "bubble",
});
Vue.use(VueRouter)
Vue.use(Vuelidate)
new Vue({
  el: '#app',
  render: h => h(App),
  router
})

