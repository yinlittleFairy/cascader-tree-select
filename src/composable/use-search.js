import { nextTick } from 'vue'

export const useSearch = (cascaderSelectRef = null) => {
 const handleSearch = (formatOptions, searchKey, ancestorHitShow = true) => {
   const updateShowStatus = (list) => {
     for (let it of list) {
       it.changeShowStatus(searchKey, ancestorHitShow)
       if (it.children && it.children.length) updateShowStatus(it.children)
     }
   }
   updateShowStatus(formatOptions)
   formatOptions.forEach(item => {
     let _allCheckedLeafs = item.findLeafs(true)?.filter(it => it.checked)
     _allCheckedLeafs.forEach(it => { it.onCheckedClick(true) })
   })
   nextTick(() => {
     let _options = formatOptions.filter(it => !!it.menuNodeShow)
     cascaderSelectRef.value?.convertActive(_options.find(it => it.checked || it.indeterminate) || _options?.[0])
   })
 }
 return {
   handleSearch
 }
}
