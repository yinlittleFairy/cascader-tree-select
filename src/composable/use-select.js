export const useSelect = (emit) => {
  const handleSelectAll = (panelOptions, checkAll) => {
    panelOptions.forEach(item => {
      item.onCheckedClick(checkAll)
    })
  }
  const handleSelectChange = (checked, menuItem) => {
    menuItem.onCheckedClick(checked)
    if (emit) emit('clickMenuItem', menuItem)
  }
  return {
    handleSelectAll,
    handleSelectChange
  }
}
