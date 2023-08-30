import shortid from 'js-shortid'
const spliter = ','

class MenuNode {
  constructor ({
                 data = {},
                 level = 0,
                 leaf = false,
                 parent = null,
                 children = [],
                 store,
                 indeterminate,
                 checked
               }) {
    this.uid = shortid.gen()
    this.value = data.value
    this.label = data.label
    this.level = level
    this.leaf = leaf
    this.parent = parent
    this.children = children
    this.disabled = !!data.disabled
    this.path = data.path || this.formatPath()
    this.pathName = data.pathName || this.formatLabel()
    this.store = store
    this.leafNodesNum = 0
    this.checked = checked
    this.indeterminate = indeterminate
    this.colorDangerField = data.colorDangerField
    this.menuNodeShow = true
  }

  formatKeyFromParent (key) {
    const list = [this?.[key]]
    let parent = this.parent
    while (parent) {
      list.unshift(parent?.[key])
      parent = parent?.parent
    }
    return list
  }

  formatPath () {
    return this.formatKeyFromParent('value')
  }

  formatLabel () {
    return this.formatKeyFromParent('label')
  }

  getVisibleChild () {
    const lists = this.children || []
    return lists.filter(item => item.menuNodeShow)
  }

  changeCheckVal (val) {
    this.checked = val
    this.indeterminate = false
  }

  changeCompStatus (type) {
    if (!type) return
    if (type === 'checked') {
      this.checked = true
      this.indeterminate = false
    } else if (type === 'indeterminate') {
      this.checked = false
      this.indeterminate = true
    } else if (type === 'empty') {
      this.checked = false
      this.indeterminate = false
    }
  }

  changeChildrenVal (val) {
    this.children = Array.isArray(val) ? val : null
  }

  changeNodeShow (val) {
    this.menuNodeShow = val
  }

  changeShowStatus (searchKey, ancestorHitShow = false) {
    const ancestorHasInSearch = (node) => {
      if (!node) return false
      if (node.label.includes(searchKey)) return true
      return !!ancestorHasInSearch(node.parent)
    }
    const hasLabelInSearch = (node) => {
      if (!searchKey) return true
      if (!node || !node?.label) return false
      if (node.label.includes(searchKey)) return true
      if (ancestorHitShow) return !!ancestorHasInSearch(node.parent)
    }

    const loopNum = (node) => {
      if (!node) return 0
      if (node.leaf) {
        const hasLeafSearched = hasLabelInSearch(node)
        this.changeNodeShow(hasLeafSearched)
        return hasLeafSearched ? 1 : 0
      }
      if (node.children && node.children.length) {
        let selectedChildNum = 0
        node.children.forEach(it => {
          selectedChildNum += loopNum(it)
        })
        this.changeNodeShow(!!selectedChildNum)
        return selectedChildNum
      }
    }

    loopNum(this)
  }

  onCheckedClick (val) {
    this.changeCheckVal(val)
    this.changeChildStatus(val)
    this.changeParentStatus(val)
    if (typeof this.store?.onNodeChange === 'function') this.store.onNodeChange(this)
  }

  changeChildStatus (val) {
    if (this.leaf) return
    for (let it of this.getVisibleChild()) {
      it?.changeCheckVal(val)
      it?.changeChildStatus(val)
    }
  }

  findSiblings () {
    if (!this.parent) return []
    const child = this.parent.children
    return Array.isArray(child) ? child : []
  }

  findLeafs (onlyShow = false) {
    const res = []
    const loop = (item) => {
      if (!item) return
      if (item.leaf && (onlyShow ? item.menuNodeShow : true)) res.push(item)
      if (item?.children && item?.children.length) item.children.forEach(it => loop(it))
    }
    loop(this)
    return res
  }

  changeParentStatus () {
    if (!this.parent) return
    const showSiblings = this.findSiblings()?.filter(item => item.menuNodeShow) || []
    const siblingsCheckedNum = showSiblings.filter(item => item.checked)?.length
    const childrenHasIndeterminate = showSiblings.some(item => item.indeterminate)
    const parentStatus = siblingsCheckedNum
      ? siblingsCheckedNum === showSiblings.length ? 'checked' : 'indeterminate'
      : childrenHasIndeterminate ? 'indeterminate' : 'empty'
    this.parent.changeCompStatus(parentStatus)
    this.parent.changeParentStatus()
  }
}

export const emitsEnum = {
  'resultChange': 'resultChange',
  'checkedNode': 'checkedNode'
}

export class MenuStore {
  constructor (options = [], editVal = [], cascaderMaxLevel = 2) {
    this.nodesTree = []
    this.result = new Map()
    this.callbacks = {}
    this.initLists(options, editVal, cascaderMaxLevel)
  }

  onNodeChange (item) {
    item.checked ? this.onChecked(item) : this.onCancelCheck(item)
    this.emitChange(emitsEnum.checkedNode, this.result)
  }

  hasParentKeyInEdit (path, editVal) {
    if (!path || !editVal) return false
    return editVal.some(it => path.join(spliter).startsWith(it + spliter))
  }

  listenChange (key, func) {
    if (typeof func === 'function') {
      if (!this.callbacks[key]) this.callbacks[key] = []
      this.callbacks[key].push(func)
    }
  }

  emitChange (key, value) {
    const cbs = this.callbacks[key]
    if (cbs) {
      cbs.forEach(cb => cb(value))
    }
  }

  delKeysFromResult (keys = []) {
    keys.forEach(item => {
      this.result.delete(item)
    })
    this.emitChange(emitsEnum.resultChange, this.result)
  }

  insetKeyInResult (path, node) {
    this.result.set(path.join(spliter), node)
    this.emitChange(emitsEnum.resultChange, this.result)
  }

  onChecked (item) {
    const { path, leafNodesNum } = item
    let _allShowLeafs = item.findLeafs(true) || []
    let _isAllLeafsShow = _allShowLeafs.length === leafNodesNum
    if (_isAllLeafsShow) {
      this.insetKeyInResult(path, item)
      const loopAddParent = (node) => {
        if (!node.parent) return
        const siblings = node.findSiblings()
        let allSiblingsChecked = true
        for (let item of siblings) {
          if (!item.checked) {
            allSiblingsChecked = false
            break
          }
        }
        if (allSiblingsChecked) {
          let _allSiblingsKeys = siblings.map(it => (it.path.join(spliter)))
          this.delKeysFromResult(_allSiblingsKeys)
          this.insetKeyInResult(node.parent.path, node.parent)
          loopAddParent(node.parent)
        }
      }
      loopAddParent(item)
      const childKeys = this.getChildKeysFromResult(item.path)
      this.delKeysFromResult(childKeys)
      return
    }
    _allShowLeafs.forEach(it => this.onChecked(it))
  }
  getChildKeysFromResult (path) {
    if (!path) return []
    let key = path.join(spliter)
    if (!key) return []
    const res = []
    const reg = new RegExp(`^${key}${spliter}.+$`)

    for (const item of this.result.keys()) {
      if (reg.test(item)) res.push(item)
    }
    return res
  }
  onCancelCheck (item) {
    let { path, leafNodesNum, children } = item
    if (!path) return
    const loopDel = (node) => {
      if (!node.parent) return
      const siblings = node.findSiblings()
      const siblingsExceptSelf = siblings?.filter(item => item.path.join(spliter) !== node.path.join(spliter))
      let allSiblingsChecked = true
      for (let item of siblingsExceptSelf) {
        if (!item.checked) {
          allSiblingsChecked = false
          break
        }
      }
      if (allSiblingsChecked) {
        siblingsExceptSelf.forEach(item => {
          this.insetKeyInResult(item.path, item)
        })
        this.delKeysFromResult([node.parent.path.join(spliter)])
        loopDel(node.parent)
      }
    }
    loopDel(item)
    this.delKeysFromResult([item.path.join(spliter)])

    let _allShowLeafs = item.findLeafs(true) || []
    let _isAllLeafsShow = _allShowLeafs.length === leafNodesNum
    // 如果有搜索词，取消选中时，仅取消menuNodeShow是true的，并将menuNodeShow是false的加入result中
    if (!_isAllLeafsShow) {
      const loop = (list) => {
        if (!list) return
        for (let item of list) {
          if (!item.menuNodeShow) {
            if (item.checked) this.insetKeyInResult(item.path, item)
          } else loop(item?.children)
        }
      }
      loop(children)
    }
  }

  initLists (options = [], editVal, cascaderMaxLevel) {
    const initNodes = (lists = [], level = 0, parent = null) => {
      return lists?.map(item => {
        const isLeaf = !item?.children?.length || level === cascaderMaxLevel
        const config = {
          data: item,
          level,
          leaf: isLeaf,
          parent,
          checked: false,
          indeterminate: false,
          children: item?.children || null,
          store: this
        }
        const node = new MenuNode(config)
        if (item?.children) {
          node.changeChildrenVal(initNodes(item.children, level + 1, node))
        }
        node.leafNodesNum = node.leaf ? 1 : node.children.reduce((result, it) => { return result + it.leafNodesNum }, 0)

        if (editVal.length) {
          let _childrenNum = editVal.filter(it => it.startsWith(node.path.join(','))).length
          let _parentSelected = editVal.some(it => node.path.join(',').startsWith(it))
          let selfSelected = editVal.find(it => it === node.path.join(','))
          node.checked = _parentSelected || _childrenNum === node.leafNodesNum
          node.indeterminate = !!_childrenNum && _childrenNum < node.leafNodesNum && !selfSelected
          if (node.checked && !this.hasParentKeyInEdit(node.path, editVal)) {
            this.insetKeyInResult(node.path, node)
          }
        }
        return node
      })
    }

    this.nodesTree = initNodes(options)
  }

  getNodesTree () {
    return this.nodesTree
  }

  getNodeByPath (path) {
    if (!path || !Array.isArray(path)) return null
    let parent = this.nodesTree
    let cur = null
    for (let key in path) {
      cur = parent.find(it => it.value === path[key])
      if (!cur) return null
      parent = cur.children
    }
    return cur
  }
}
