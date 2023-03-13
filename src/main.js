import Vue from 'vue'
import Vuelidate from '@vuelidate/core'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from "./routes";

Vue.prototype.$eventBus = new Vue();

Vue.use(VueRouter)
Vue.use(Vuelidate)
new Vue({
  el: '#app',
  render: h => h(App),
  router
})

