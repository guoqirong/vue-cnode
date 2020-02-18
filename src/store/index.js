import Vue from 'vue'
import Vuex from 'vuex'
import topic from './modules/topic'
import user from './modules/user'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    topic,
    user
  }
})

export default store