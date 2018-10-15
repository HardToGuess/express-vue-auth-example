import Index from '@/components/Index'
import store from '@/store'
import auth from '@/store/modules/auth'
import { factory as wrapperFactory } from '../factory'

describe('Index.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = wrapperFactory({ component: Index })
  })

  it('should render correct contents', () => {
    expect(wrapper.find('h1').text()).toBe('Auth')
  })

  it('Shows links to sign up and sign in page if user not authenticated', () => {
    expect(store.getters.user).toBeNull()
    expect(wrapper.find('.sign-in-link').exists()).toBe(true)
    expect(wrapper.find('.sign-up-link').exists()).toBe(true)
  })

  it('Not showing links to sign-up page and sign-in page if user authenticated', () => {
    expect(store.getters.user).toBeNull()
    store.commit('setUser', { user: { username: 'JohnDoe' } })
    expect(store.getters.user).not.toBe(null)
    expect(wrapper.find('.logout-link').exists()).toBe(true)
  })
})
