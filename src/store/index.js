import Vue from 'vue'
import Vuex from 'vuex'
import usersData from "./usersData";
import userSettings from "./userSettings";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    usersData,
    userSettings
  }
})
