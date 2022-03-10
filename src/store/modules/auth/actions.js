let timer;
export default {

  // Login method to login
  async login(context, payload){
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    })
  },

  // Signup method to signup
  async signup(context, payload){
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    })
  },

  async auth(context, payload){
    // Set mode login or signup
    const mode = payload.mode

    // Get url for signup or login
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API]'
    if(mode === 'signup'){
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API]'
    }

    // HTTP request to firebase with a url
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    })

    // Await response is set to responseData
    const responseData = await response.json()

    // Check if error occured
    if(!response.ok) {
      console.log(responseData)
      const error = new Error(responseData.message || 'Login went wrong')
      throw error
    }

    const expiresIn = +responseData.expiresIn * 1000
    const expirationDate = new Date().getTime() + expiresIn
    
    // Store data in the local storage / cache
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate )

    // Set timeout for logout automatic logout after x time
    timer = setTimeout(function(){
      context.dispatch('autoLogout')
    }, expiresIn)

    // Set user data to state
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    })
  },

  // Auto login
  autoLogin(context){
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const tokenExpiration = localStorage.getItem('tokenExpiration')

    const expiresIn = +tokenExpiration - new Date().getTime()

    if(expiresIn < 0) {
      return
    }

    timer = setTimeout(function(){
      context.dispatch('autoLogout')
    }, expiresIn)

    if(token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId
      })
    }
  },

  // Logout method to logout
  logout(context){
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpiration')

    clearTimeout(timer)

    context.commit('setUser', {
      token: null,
      userId: null
    })
  },

  autoLogout(context){
    context.dispatch('logout')
    context.commit('setAutoLogout')
  }
}