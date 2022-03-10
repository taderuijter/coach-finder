export default {

  // this is a post method for the contact form.
  async contactCoach(context, payload){
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    }

    const response = await fetch(`https://coach-finder-137c4-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,{
      method: 'POST',
      body: JSON.stringify(newRequest)
    })

    const responseData = await response.json()
    
    if(!response.ok) {
      const error = new Error(responseData.message || 'Failed to send the request.')
      throw error
    }

    // This data is stored locally and not in the firebase server
    newRequest.id = responseData.name
    newRequest.coachId = payload.coachId

    context.commit('addRequest', newRequest)
  },

  async fetchRequests(context){
    const coachId = context.rootGetters.userId
    const token = context.rootGetters.token
    const response = await fetch(`https://coach-finder-137c4-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=` + token)
    const responseData = await response.json()

    if(!response.ok){
      const error = new Error(responseData.message || 'Failed to fetch requests.')
      throw error
    }

    // Helper variable
    const requests = []

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      }
      requests.push(request)
    }

    context.commit('setRequests', requests)
  }
}