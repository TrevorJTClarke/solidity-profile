// import Vue from 'vue'
export default {
  SET_ACCOUNT (state, account) {
    state.account = account
  },
  SET_METAMASK (state, isPresent) {
    state.metamask = isPresent
  },
  SET_RETRY (state, haveRetried) {
    state.retried = haveRetried
  },
  SET_CONNECTED (state, isConnected) {
    state.connected = isConnected
  },
  CLEAR_CONTRACT (state) {
    state.logs = []
    state.User = null
    state.address = null
    state.skills = []
    state.userName = null
  },
  ADD_USER (state, contract) {
    state.User = contract
  },
  ADD_ADDRESS (state, address) {
    state.address = address
  },
  CLEAR_LOGS (state) {
    state.logs = []
  },
  ADD_LOGS (state, logs) {
    state.logs.push(...logs)
  },
  SET_USERNAME (state, name) {
    state.userName = name
  },
  SET_SKILLS (state, skills) {
    state.skills = skills
  },
  ADD_SKILL (state, skill) {
    state.skills.push(skill)
  }
}
