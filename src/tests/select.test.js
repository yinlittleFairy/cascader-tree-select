

import { expect, test } from 'vitest'

import { mountComp } from './render'
import { useSelect } from '../composable/use-select.js'
import { useStore } from '../composable/use-store.js'



test('select paint right', () => {

  const { vm } = mountComp(() => {
    const { handleSelectChange, handleSelectAll } = useSelect()
    const options= new Array(2).fill({}).map((_,idx) => ({
      label: 'a'.repeat(idx + 1),
      value: idx,
      children: [{ label: 'ab'.repeat(idx + 1), value: idx + 10, children: [{ label: 'abc'.repeat(idx + 1), value: idx + 100} ]}] }))
    const { initMenuStore, formatOptions } = useStore({ options: options })

    return {
      handleSelectChange,
      handleSelectAll,
      initMenuStore,
      formatOptions
    }
  })

  vm.initMenuStore()

  // 初始化每条数据的checked应该均为false
  expect(vm.formatOptions[0].checked).toBe(false)
  expect(vm.formatOptions[0].children[0].checked).toBe(false)
  expect(vm.formatOptions[0].children[0].children[0].checked).toBe(false)

  // 选中第一条
  vm.handleSelectChange(true, vm.formatOptions[0])

  expect(vm.formatOptions[0].checked).toBe(true)
  expect(vm.formatOptions[0].children[0].checked).toBe(true)
  expect(vm.formatOptions[0].children[0].children[0].checked).toBe(true)

  // 全选
  vm.handleSelectAll(vm.formatOptions, true)

  expect(vm.formatOptions[1].checked).toBe(true)
  expect(vm.formatOptions[1].children[0].checked).toBe(true)
  expect(vm.formatOptions[1].children[0].children[0].checked).toBe(true)
})

