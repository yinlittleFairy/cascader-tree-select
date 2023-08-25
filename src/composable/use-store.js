import { ref } from 'vue'
import { MenuStore, emitsEnum } from './menu-store.js'
import debounce from 'lodash.debounce'
export const useStore = ({ cascaderMaxLevel = 2, needResultPanel = true, resultLabelJoiner = ' > ' }, emit) => {
  const menuStore = ref(null)
  const resultStore = ref(null)

  const initMenuStore = (menuOptions = [], value = []) => {
    let _edit = []
    if (value.length) _edit = value?.map(it => it.join(','))
    menuStore.value = new MenuStore(menuOptions, _edit, cascaderMaxLevel)
    const debouncedListenCheckedFun = debounce((result) => {
      let _result = []
      for (let [, node] of result) {
        _result.push(node.path)
      }
      if (emit) emit('change', _result)
    }, 300)
    menuStore.value.listenChange(emitsEnum.checkedNode, debouncedListenCheckedFun)
    if (needResultPanel) {
      const debouncedListenResFun = debounce((result) => {
        initResultStore(result)
      })
      menuStore.value.listenChange(emitsEnum.resultChange, debouncedListenResFun)
      initResultStore(menuStore.value.result)
    }
  }
  const initResultStore = (result) => {
    let _result = []
    if (result) {
      for (let [, node] of result) {
        _result.push(node)
      }
    }
    const getLeafNodes = (node) => {
      return node.reduce((prev, cur) => {
        return cur.leaf
          ? [...prev, {
            ...cur,
            value: cur.path.join(','),
            label: cur.pathName.join(resultLabelJoiner),
          }] : [...prev, ...getLeafNodes(cur.children)]
      }, [])
    }
    resultStore.value = new MenuStore(getLeafNodes(_result))
  }

  const removeSelectedCate = () => {
    if (!resultStore.value) return
    const nodes = resultStore.value.getNodesTree()
    const checkedNodes = nodes.filter(it => it.checked)
    let _store = menuStore.value
    checkedNodes.forEach(it => {
      const node = _store.getNodeByPath(it.path)
      if (node) {
        node.onCheckedClick(false)
      }
    })
  }

  const handleDestroyed = () => {
    menuStore.value = null
    resultStore.value = null
  }

  return {
    resultStore,
    menuStore,
    initMenuStore,
    handleDestroyed,
    removeSelectedCate,
  }
}
