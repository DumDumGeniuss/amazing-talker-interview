import { mount } from '@vue/test-utils'
import ScheduleTable from './index.vue'

describe('ScheduleTable', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(ScheduleTable)
    expect(wrapper.exists()).toBeTruthy()
  })
})
