export default {

  // Register a coach to firebase
  registerCoach(state, payload) {
    state.coaches.push(payload)
  },

  // Set coaches from firebaser
  setCoaches(state, payload) {
    state.coaches = payload
  },

  // Set the timestamp for lastFetch
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime()
  }
};