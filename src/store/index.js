import { createStore } from 'vuex'

import CoachModule from '../store/modules/coaches/index.js'
import RequestModule from '../store/modules/requests/index.js'
import AuthModule from '../store/modules/auth/index.js'

const store = createStore({
  modules: { 
    coaches: CoachModule,
    requests: RequestModule,
    auth: AuthModule,
  }
})

export default store
