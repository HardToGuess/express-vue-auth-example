import router from '../../router'
 
const handleError = (err) => {
    const errorMessage = err && err.response && err.response.data && err.response.data.message
    if (errorMessage) {
        alert(errorMessage)
    } else {
        console.log(error)
        alert('Something went wrong, check console')
    }
}

const state = {
    user: null
}
const getters = {
  user: state => state.user
}
const actions = {
    // Signing in
    async signIn({ state, commit }, { username, password }) {
        try {
            if (!username || !password) return
            const response = await this.axios.post('/api/v1/users/sign_in', { username, password })
            const user = response && response.data && response.data && response.data.user
            if (user) {
              commit('setUser', { user })
              router.push({ name: 'index' })
            }
          } catch (err) {
            handleError(err)
        }
    },
    // Signin up
    async signUp ({ state, commit }, { username, password }) {
        try {
            if (!username || !password) return
            const response = await this.axios.post('/api/v1/users/sign_up', { username, password })
            const user = response && response.data && response.data.user
            user && commit('setUser', { user })
            router.push({ name: 'index' })
          } catch (err) {
            handleError(err)
        }
    },
    // Logs out
    async logout({ state, commit }) {
        commit('setUser', { user: null })
    }
}
const mutations = {
  setUser (state, { user }) {
      state.user = user
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
