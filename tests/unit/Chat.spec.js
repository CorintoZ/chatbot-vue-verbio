import { shallowMount } from '@vue/test-utils'
import Chat from '@/components/Chat.vue'

describe('Chat.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Chat, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
