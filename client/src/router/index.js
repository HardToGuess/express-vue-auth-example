import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import SignIn from '@/components/Auth/SignIn'
import SignUp from '@/components/Auth/SignUp'
import store from '../store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/signin',
      name: 'sign-in',
      component: SignIn,
      meta: { showOnlyIfUserNotLoggedIn: true }
    },
    {
      path: '/signup',
      name: 'sign-up',
      component: SignUp,
      meta: { showOnlyIfUserNotLoggedIn: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.showOnlyIfUserNotLoggedIn)) {
    if (store.getters.user) {
      next({ name: 'index' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
