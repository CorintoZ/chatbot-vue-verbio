import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Chat from '@/views/Chat.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Chat.vue', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      sendMessage: jest.fn(),
      welcomeUser: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
  })

  it('Does not dispatch "sendMessage" when input is empty', async () => {
    const wrapper = shallowMount(Chat, { store, localVue })
    wrapper.setData({
      input: ''
    })
    wrapper.vm.sendMessage()
    await wrapper.vm.$nextTick()
    expect(actions.sendMessage).not.toHaveBeenCalled()
  })

  it('Dispatch "sendMessage" when input', async () => {
    const wrapper = shallowMount(Chat, { store, localVue })
    wrapper.setData({
      input: 'test'
    })
    wrapper.vm.sendMessage()
    await wrapper.vm.$nextTick()
    expect(actions.sendMessage).toHaveBeenCalled()
  })
})
