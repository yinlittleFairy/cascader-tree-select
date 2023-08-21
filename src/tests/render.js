import { mount } from '@vue/test-utils'
// import { ComponentInstance } from '@vue/composition-api'
// import { defineComponent, UnwrapRef } from 'vue-demi'
import {  defineComponent } from 'vue'

export const mountComp = (cb) => {
  const comp = defineComponent({
    setup: cb,
    template: '<div ref="app" id="app"></div>'
  })

  const wrapper = mount(comp)
  const vm = wrapper.vm
  return {
    wrapper,
    vm
  }
}
