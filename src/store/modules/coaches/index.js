
// Seperated mutations, getters and actions files to make the project more readable
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

export default {
  namespaced: true,
  
  // Default state for the coaches list
  state() {
    return {
      // Timestamp when data is last fetched
      lastFetch: null,

      // All coaches that come from firebase
      coaches: []
    }
  },

  // import sperated files for mutations, getters and actions
  mutations,
  actions,
  getters,
}