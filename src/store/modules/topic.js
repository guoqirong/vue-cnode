export default {
  namespaced: true,
  state: {
    tab: ''
  },
  mutations: {
    updateTab (state, tab) {
      state.tab = tab
    }
  }
}