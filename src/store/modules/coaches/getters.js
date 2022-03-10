export default {
  // A getter that gets the data from the state
  coaches(state) {
    return state.coaches;
  },

  // Looks if we have coaches
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0
  },

  // A getter that looks if the coach id already exists
  // The underscore is a confention that to specify the paramiters that are not used
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches
    const userId = rootGetters.userId
    return coaches.some(coach => coach.id === userId)
  },

  // This is a function that checks if the timestamp is set les than a minute ago
  shouldUpdate(state) {
    const lastFetch = state.lastFetch
    if(!lastFetch) {
      return true
    }
    const currentTimeStamp = new Date().getTime()
    return (currentTimeStamp - lastFetch / 1000 > 60)
  }
}