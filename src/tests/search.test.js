import { expect, test } from 'vitest'

import { mountComp } from './render'
import { useStore } from '../composable/use-store.js'
import { useSelect } from '../composable/use-select.js'
import { useSearch } from '../composable/use-search.js'



test('search right', () => {

  const { vm } = mountComp(() => {
    const options= new Array(2).fill({}).map((_,idx) => ({
      label: 'a'.repeat(idx + 1),
      value: idx,
      children: [{ label: 'ab'.repeat(idx + 1), value: idx + 10, children: [{ label: 'abc'.repeat(idx + 1), value: idx + 100} ]}] }))
    const { initMenuStore, formatOptions } = useStore({ options: options })

    const { handleSearch } = useSearch()
    return {
      initMenuStore,
      formatOptions,
      handleSearch
    }
  })

  vm.initMenuStore()

  // 搜索关键字c
  vm.handleSearch(vm.formatOptions, 'c')
  expect(vm.formatOptions[0].menuNodeShow).toBe(true)
  expect(vm.formatOptions[0].children[0].menuNodeShow).toBe(true)
  expect(vm.formatOptions[0].children[0].children[0].menuNodeShow).toBe(true)

  // 搜索关键字d
  vm.handleSearch(vm.formatOptions, 'd')
  expect(vm.formatOptions[0].menuNodeShow).toBe(false)
  expect(vm.formatOptions[0].children[0].menuNodeShow).toBe(false)
  expect(vm.formatOptions[0].children[0].children[0].menuNodeShow).toBe(false)
})

