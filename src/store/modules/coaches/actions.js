export default {
  
  // Register a coach async
  async registerCoach(context, data) {

    // Store id of the user / coach
    const userId = context.rootGetters.userId

    // Get all data from the form on the register coach page
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    }

    // Store the firebase token to use in the http request
    const token = context.rootGetters.token

    // PUT the response in a firebase database
    // PUT will replace the data / PUSH will add the data
    const response = await fetch(`https://coach-finder-137c4-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json?auth=` + token, {
      method: 'PUT',
      body: JSON.stringify(coachData)
    })

    // You can wait on the json response
    // const responseData = await response.json()

    // If response is not ok do an error
    if(!response.ok) {
      // error ...
    }

    // Commit data to the vuex store
    context.commit('registerCoach', {
      ...coachData,
      id: userId
    })
  },

  // new action for getting data from the firebase database
  async loadCoaches(context, payload){

    // Check the timestamp
    if(!payload.forceRefresh && !context.getters.shouldUpdate) {
      return
    }

    const response = await fetch(
      `https://coach-finder-137c4-default-rtdb.europe-west1.firebasedatabase.app/coaches.json`
    )

    // You can wait on the json response
    const responseData = await response.json()

    // If response is not ok do an error
    if(!response.ok) {
      const error = new Error( responseData.message || 'Failed to fetch!' )
      throw error
    }

    // helper variable
    const coaches = []

    // For loop for the responseData
    for (const key in responseData) {
      
      // Construct a object per coach that is registered in firebase
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      }

      // After the consturctor we push the coach to the array
      coaches.push(coach)

      // Now we commit the coaches array to the store
      context.commit('setCoaches', coaches)

      // Set the timestamp in the state, no payload is needed.
      context.commit('setFetchTimestamp')
    }
  }


}