export default {
  state: {
    numberOfRecords: 5,
    counter: 0,
  },
  mutations: {
    changeQuantity(state, payload) {
      state.numberOfRecords = payload;
    },
    increment(state, payload){
      state.counter += payload;
    }
  },
  actions: {},
  getters: {
    numberOfRecords(state) {
      return state.numberOfRecords
    },
    counter(state) {
      return state.counter
    }
  },
}
