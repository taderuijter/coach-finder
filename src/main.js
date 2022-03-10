import { createApp, defineAsyncComponent } from 'vue'

// import packages to the Vue app
import router from './router'
import store from './store'

// Import main vue component App.vue
import App from './App.vue'

// Import global components
import BaseCard from './components/base/BaseCard.vue'
import BaseButton from './components/base/BaseButton.vue'
import BaseBadge from './components/base/BaseBadge.vue'
import BaseSpinner from './components/base/BaseSpinner.vue'
// import BaseDialog from './components/base/BaseDialog.vue'

const BaseDialog = defineAsyncComponent(()=> import('./components/base/BaseDialog.vue'))

// Store the createApp in a constant
const app = createApp(App)

// Use the store and Router
app.use(store);
app.use(router);

// Register global components
app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner)
app.component('base-dialog', BaseDialog)

// Mount everything to the DOM
app.mount('#app');
