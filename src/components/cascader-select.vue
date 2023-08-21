<template>
  <div class="cascader-select">
    <cascader-panel
      v-for="level in props.cascaderMaxLevel + 1"
      :key="level"
      :cur-panel-level="level - 1"
      :cascader-max-level="props.cascaderMaxLevel"
      :panel-options="getPanelOptions(level - 1)"
      :panel-menu-title="panelTitleList[level - 1]"
      :panel-active-list="panelActiveNode"
      :global-search-word="globalSearchWord"
      @clickMenuItem="convertActive"
    ></cascader-panel>
  </div>
</template>

<script setup>
import CascaderPanel from './cascader-panel.vue'
import { ref, watch } from 'vue'
const props = defineProps({
  options: {
    type: Array,
    default: () => ([])
  },
  cascaderMaxLevel: {
    type: Number,
    default: 3
  },
  globalSearchWord: {
    type: String,
    default: ''
  },
  panelTitleList: {
    type: Array,
    default: () => ([])
  }
})

const panelActiveNode = ref([])
const getPanelOptions = (level) => {
  if (level === 0) return props.options?.filter(it => it.menuNodeShow)
  let cur = panelActiveNode.value?.[level - 1]
  return cur?.children?.filter(it => it.menuNodeShow) || []
}

const convertActive = (item) => {
  const itemLevel = item?.level || 0
  const activeList = panelActiveNode.value?.slice(0, itemLevel)
  activeList.push(item)
  let cur = item
  while (cur && cur.children) {
    const visibleLists = cur?.getVisibleChild()
    cur = visibleLists?.find(it => it.checked || it.indeterminate) || visibleLists?.[0]
    activeList.push(cur)
  }
  panelActiveNode.value = activeList
}

watch(() => props.options, (val) => {
  if (!Array.isArray(val) || !val.length) panelActiveNode.value = []
  // 高亮第一个有选中的节点
  let _firstSelected = val?.find(it => it.checked || it.indeterminate)
  convertActive(_firstSelected || val?.[0])
})

defineExpose({ convertActive })
</script>

<style scoped>

</style>
