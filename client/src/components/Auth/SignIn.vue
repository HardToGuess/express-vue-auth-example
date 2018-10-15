<template>
    <div class="row">
        <div class="col s12">
          <h4>Sign in to your account</h4>
          <form action="#">
            <p>
              <input type="text" placeholder="Enter your username" id="username" v-model="username">
            </p>
            <p>
              <input type="password" placeholder="Enter your password" id="password" v-model="password">
            </p>
            <p>
              <a href="javascript:;" class="btn grey darken-3 waves-effect waves-light width100" @click="signIn({ username, password })">Sign in</a>
            </p>
            <p>
              <router-link :to="{ name: 'sign-up' }">Create new account</router-link>
            </p>
          </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'SignIn',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      ...mapActions(['signIn'])
    }
}
</script>
<style scoped>

</style>
