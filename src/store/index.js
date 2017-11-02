import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import abi from '../../build/contracts/User.json'
Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'
const debug = false

const state = {
  userName: null,
  skills: [],
  retried: false,
  metamask: false,
  account: null,
  connected: false,
  User: null,
  address: null,
  logs: [],
  abi
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: false, // debug,
  plugins: debug ? [createLogger()] : []
})
