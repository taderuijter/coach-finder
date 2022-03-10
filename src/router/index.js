import { createRouter, createWebHistory } from 'vue-router'

// Import page components
import CoachDetail from '../views/coaches/Detail.vue'
import CoachList from '../views/coaches/List.vue'
import CoachRegistration from '../views/coaches/Registration.vue'
import RequestsReciever from '../views/requests/Reciever.vue'
import RequestContact from '../views/requests/Contact.vue'
import NotFound from '../views/NotFound.vue'
import UserAuth from '../views/auth/UserAuth.vue'
import store from '../store/index.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Adds a redirect for the homepage to /coaches
    // Register homepage route /coaches
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachList },

    // Specific coach page with a nested route to contact the coach
    // If props are set to true the vue-router will send the :id to the page as a prop
    { path: '/coaches/:id', component: CoachDetail, props: true, children: [
      { path: 'contact', component: RequestContact },
    ]},

    // Extra pages that are needed to register a coach and send requests
    { path: '/register', component: CoachRegistration, meta: { requiresAuth: true } },
    { path: '/requests', component: RequestsReciever, meta: { requiresAuth: true } },

    // Login page
    { path: '/login', component: UserAuth, meta: { requiresUnauth: true } },

    // Not found page like a 404
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

// Global navigation guard
router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});


export default router;