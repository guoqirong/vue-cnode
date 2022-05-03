export default {
  namespaced: true,
  state: {
    token: '',
    loadData: false,
    userData: ''
  },
  mutations: {
    updateToken (state, token) {
      state.token = token
    },
    updateLoadData (state, loadData) {
      state.loadData = loadData
    },
    updateUserData (state, userData) {
      state.userData = userData
    }
  }
}
