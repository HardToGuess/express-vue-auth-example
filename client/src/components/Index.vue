<template>
  <div class="hello">
    <h1>Auth</h1>
    <div v-if="!user">
      <router-link :to="{ name: 'sign-in' }" class="sign-in-link">Sign in</router-link>
      <br/>
      <router-link :to="{ name: 'sign-up' }" class="sign-up-link">Sign up</router-link>
    </div>
    <div v-else>
      Hello, {{user.username}}
      <br/>
      <a href="javascript:;" @click="logout()" class="logout-link">Logout</a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Index',
  methods: {
    ...mapActions(['logout'])
  },
  computed: mapGetters({
    user: 'user'
  })
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
