<template>
  <div id="app" class="cascader-tree-select">
    <div class="cascader-tree-select__search" v-if="needSearch">
      <el-input
        v-model.trim="searchKey"
        style="width: 240px;"
        :size="props.size"
        clearable
        :placeholder="props.placeholder"
      ></el-input>
    </div>
    <div class="cascader-tree-select__main">
      <cascader-select
        :options="formatOptions"
        :cascader-max-level="props.cascaderMaxLevel"
        :global-search-word="searchKey"
        :panel-title-list="props.panelTitleList"
        ref="cascaderSelectRef"
      ></cascader-select>
      <cascader-result
        v-if="props.needResultPanel"
        :result-options="resultStore ? resultStore.getNodesTree() : []"
        v-bind="$props"
        @removeSelectedCate="removeSelectedCate"
      ></cascader-result>
    </div>
  </div>
</template>

<script setup name="CascaderTreeSelect">
import './style.less'
import '@/plugins/element-ui'
import CascaderSelect from '@/components/cascader-select.vue'
import CascaderResult from '@/components/cascader-result.vue'
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import { useStore } from './composable/use-store.js'
import { useSearch } from './composable/use-search.js'

const props = defineProps({
  value: {
    type: Array,
     default: () => ([])
  },
  needSearch: {
    type: Boolean,
    default: true
  },
  needResultPanel: {
    type: Boolean,
    default: true
  },
  options: {
    type: Array,
    default: () => ([])
  },
  placeholder: {
    type: String,
    default: '请输入关键词进行搜索'
  },
  size: {
    type: String,
    default: 'small'
  },
  cascaderMaxLevel: {
    type: Number,
    default: 2 // 从0开始
  },
  resultLabelJoiner: {
    type: String,
    default: ' > '
  },
  panelTitleList: {
    type: Array,
    default: () => (['一级', '二级', '三级', '四级'])
  },
  ancestorHitShow: { // 祖先元素命中，子元素中不包含搜索词也展示即展示
    type: Boolean,
    default: true
  }
})

const searchKey = ref('')
const cascaderSelectRef = ref(null)

const emit = defineEmits(['change'])

const { initMenuStore, formatOptions, resultStore, handleDestroyed, removeSelectedCate } = useStore(props, emit)

const { handleSearch } = useSearch(cascaderSelectRef)

watch(() => searchKey.value, () => {
  handleSearch(formatOptions.value, searchKey.value, props.ancestorHitShow)
})

onMounted(() => {
  initMenuStore()
})

onUnmounted(() => {
  handleDestroyed()
})

</script>
