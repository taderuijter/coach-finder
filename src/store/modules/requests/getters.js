export default {
  requests(state, _, _2, rootGetters) {
    const userId = rootGetters.userId
    return state.requests.filter(req => req.coachId === userId)
  },
  hasRequests(_, getters){
    return getters.requests && getters.requests.length > 0
  }
}