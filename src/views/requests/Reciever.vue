<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="closeError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Recieved Requests</h2>
        </header>

        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>

        <ul v-else-if="hasRequests && !isLoading">
          <request-item v-for="req in allRequests" :key="req.id" :email="req.userEmail" :message="req.message"></request-item>
        </ul>
        <h3 v-else>You haven't recieved any requests yet!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
  import RequestItem from '../../components/requests/RequestItem.vue'
  export default {
    components:{
      RequestItem
    },
    data(){
      return {
        isLoading: false,
        error: null,
      }
    },
    computed: {
      allRequests(){
        return this.$store.getters['requests/requests']
      },
      hasRequests(){
        return this.$store.getters['requests/hasRequests']
      }
    },
    created(){
      this.loadRequests()
    },
    methods: {
      async loadRequests() {
        this.isLoading = true
        try {
          await this.$store.dispatch('requests/fetchRequests')
        } catch(error) {
          this.error = error.message || 'Something failed!!' 
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
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>