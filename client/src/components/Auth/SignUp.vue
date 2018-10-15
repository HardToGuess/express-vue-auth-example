<template>
    <div class="row">
        <div class="col s12">
          <h4>Sign up</h4>
          <form action="#">
            <p>
              <input type="text" placeholder="Enter username" id="username" v-model="username">
            </p>
            <p>
              <input type="password" placeholder="Enter password" id="password" v-model="password">
            </p>
            <p>
              <a href="javascript:;" class="btn grey darken-3 waves-effect waves-light width100" @click="signUp({ username, password })">Sign up</a>
            </p>
            <p>
              Have account? <router-link :to="{ name: 'sign-in' }">Sign in</router-link>
            </p>
          </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'SignUp',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      ...mapActions(['signUp'])
    }
}
</script>
<style scoped>

</style>
