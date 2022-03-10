<template>
  <div>

    <base-dialog :show="!!error" title="An error occurred" @close="closeError">
      <p>{{ error }}</p>
    </base-dialog>

    <base-dialog fixed :show="isLoading" title="Authentication">
      <base-spinner></base-spinner>
    </base-dialog>

    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
        </div>

        <p v-if="!formIsValid"> Please enter a valid e-mail and password (must be atleast 6 characters long). </p>

        <base-button>{{ submitButtonText }}</base-button>
        <base-button @click="switchMode" type="button" mode="flat" styling="outline">{{ switchModeButtonText }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
import BaseDialog from '../../components/base/BaseDialog.vue'
  export default {
  components: { BaseDialog },
    data(){
      return{
        email: '',
        password: '',
        formIsValid: true,
        mode: 'login',
        isLoading: false,
        error: null,
      }
    },

    computed: {
      // Change text for submit button
      submitButtonText() {
        if( this.mode === 'login' ) {
          return 'Login'
        } else {
          return 'Signup'
        }
      },

      // Change text for mode switch button
      switchModeButtonText(){
        if( this.mode === 'login' ) {
          return 'Signup instead'
        } else {
          return 'Login instead'
        }
      }
    },

    methods: {
      async submitForm(){
        
        // Form validation for login and signup
        this.formIsValid = true
        if(this.email === '' || !this.email.includes('@') || this.password.length < 6) {
          this.formIsValid = false
          return
        }
        
        // set loading to true
        this.isLoading = true

        // Get the user credetials
        const userCredetials = {
          email: this.email,
          password: this.password
        }

        // Sent http request to firebase and await response
        try {
          if(this.mode === 'login') {
            await this.$store.dispatch('login', userCredetials)
          } else {
            await this.$store.dispatch('signup', userCredetials)
          }

          // Gets parameters from the url that is provided
          const redirectUrl = '/' + (this.$route.query.redirect || 'coaches')
          // Redirects to the right page
          this.$router.replace(redirectUrl)
          
        } catch(err) {
          this.error = err.message || 'Failed to authenticate.'
        }

        // After the response is done set loading to false
        this.isLoading = false
      },

      // Switch mode to login of signup
      switchMode(){
        if(this.mode === 'login'){
          this.mode = 'signup'
        } else {
          this.mode = 'login'
        }
      },

      // close the error message if it occured
      closeError(){
        this.error = false
      }
    }
  }
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>