import { ref } from 'vue'
import { MenuStore, emitsEnum } from './menu-store.js'
import debounce from 'lodash.debounce'
export const useStore = ({
  options = [],
  cascaderMaxLevel = 2,
  value = [],
  needResultPanel = true,
  resultLabelJoiner = ' > '
}, emit) => {
  const menuStore = ref(null)
  const resultStore = ref(null)
  const formatOptions = ref(null)

  const initMenuStore = () => {
    let _edit = []
    if (value.length) _edit = value?.map(it => it.join(','))
    menuStore.value = new MenuStore(options, _edit, cascaderMaxLevel)
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
      if (_edit && _edit.length) initResultStore(menuStore.value.result)
    }
    formatOptions.value = menuStore.value.getNodesTree()
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
        return [...prev, ...cur.findLeafs().map(it => ({
          ...it,
          value: it.path.join(','),
          label: it.pathName.join(resultLabelJoiner)
        }))]
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
    formatOptions,
    resultStore,
    initMenuStore,
    handleDestroyed,
    removeSelectedCate,
  }
}
