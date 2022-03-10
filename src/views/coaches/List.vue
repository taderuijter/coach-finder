<template>
<div>
  <base-dialog :show="!!error" title="An error occured!" @close="closeError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <coach-filter @change-filter="setFilter"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button styling="outline" @click="loadCoaches(true)">Refresh</base-button>
        <base-button link to="/login?redirect=register" v-if="!isLoggedIn"> Login to register </base-button>
        <base-button v-if="isLoggedIn && !isCoach && !isLoading" link to="/register">Register as Coach</base-button>
      </div>

      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>

      <ul v-else-if="hasCoaches">
        <coach-item 
          v-for="coach in filteredCoaches" 
          :key="coach.id" :id="coach.id" 
          :first-name="coach.firstName" 
          :last-name="coach.lastName" 
          :rate="coach.hourlyRate" 
          :areas="coach.areas" 
        ></coach-item>
      </ul>

      <h3 v-else>No Coaches are found...</h3>
    </base-card>
  </section>
</div>
</template>

<script>
  import CoachItem from '../../components/coaches/CoachItem.vue'
  import CoachFilter from '../../components/coaches/CoachFilter.vue'
import BaseDialog from '../../components/base/BaseDialog.vue'

  export default {
    // Register local components
    components: {
      CoachItem,
      CoachFilter,
        BaseDialog,
    },

    data() {
      return {
        error: null,
        isLoading: true,
        activeFilters: {
          frontend: true,
          backend: true,
          freelance: true,
        }
      }
    },

    // Computed methods / consturctors that are cached
    computed: {

      // check if you are logged in
      isLoggedIn(){
        return this.$store.getters.isAuthenticated
      },

      // Checks if coach is already registered
      isCoach() {
        return this.$store.getters['coaches/isCoach']
      },

      filteredCoaches(){
        // We are using the getter to get all the coaches
        // The state is namespaces so we have to use the square brackets
        // Store the coaches in a const
        // Then filter out the content based on the filter you select
        // return true if its true else return false
        const coaches = this.$store.getters['coaches/coaches']
        return coaches.filter(coach => {
          if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
            return true
          }
          if (this.activeFilters.backend && coach.areas.includes('backend')) {
            return true
          }
          if (this.activeFilters.freelance && coach.areas.includes('freelance')) {
            return true
          }
          return false
        })
      },
      hasCoaches() {
        // This is the getter that looks to the length of the coaches
        // If there are no coaches in the store we get a No coaches are found message
        return !this.isLoading && this.$store.getters['coaches/hasCoaches']
      }
    },

    created(){
      this.loadCoaches()
    },

    // Methods
    methods: {
      // This is the method for the emit function
      setFilter(updateFilters) {
        this.activeFilters = updateFilters
      },
      async loadCoaches(refresh = false){
        this.isLoading = true
        try {
          await this.$store.dispatch('coaches/loadCoaches', {forceRefresh: refresh})
        } catch(error) {
          this.error = error.message || 'Something went wrong...'
        }
        this.isLoading = false
      },
      closeError(){
        this.error = null
      }
    }

  }
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>