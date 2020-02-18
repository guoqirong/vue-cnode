export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    updateToken (state, token) {
      state.token = token
    }
  }
}
