import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import 'materialize-css/dist/css/materialize.css'
// Set base url
axios.defaults.baseURL = 'http://localhost:3001'
// We want to use axios in store also
store.axios = axios
Vue.config.productionTip = false
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
