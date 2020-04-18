import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Login from '@/views/Login.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Login.vue', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      loginUser: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  })

  it('Does not dispatch "loginUser" when user or password is empty', async () => {
    const wrapper = shallowMount(Login, { store, localVue })
    wrapper.setData({
      input: {
        user: '',
        password: ''
      }
    })
    wrapper.vm.submit()
    await wrapper.vm.$nextTick()
    expect(actions.loginUser).not.toHaveBeenCalled()
  })

  it('dispatches "loginUser" when input is not empty', async () => {
    const wrapper = shallowMount(Login, { store, localVue })
    wrapper.setData({
      input: {
        user: 'admin',
        password: 'admin'
      }
    })
    wrapper.vm.submit()
    await wrapper.vm.$nextTick()
    expect(actions.loginUser).toHaveBeenCalled()
  })
})
