<template>
  <div class="cascader-panel" :style="{ width: `calc(100% / ${props.cascaderMaxLevel})` }">
    <div class="cascader-panel__head">
      <div v-if="supportSelectAll">
        <el-checkbox
          :value="panelStatus.checked"
          :indeterminate="panelStatus.indeterminate"
          :disabled="!panelShowOptions.length"
          @change="checked => handleSelectAll(props.panelOptions, checked)"
        ></el-checkbox>
        全选
      </div>
      <label v-if="panelMenuTitle">{{ props.panelMenuTitle }}</label>
      <el-input
        v-if="isResultPanel && showResultSearch"
        v-model.trim="resultSearchKey"
        style="width: 160px;"
        placeholder="请输入"
        size="small"
        clearable
        suffix-icon="el-icon-search"
      ></el-input>
    </div>
    <div class="cascader-panel__menu">
      <div v-if="isResultPanel && showResultCount" class="cascader-panel__menu__operate">
        <span>已添加({{ panelOptions.length }}条)</span>
        <span class="remove-button" :class="{ 'remove-button__disabled': !panelStatus.checked && !panelStatus.indeterminate }" @click="emit('removeSelectedCate')">移除</span>
      </div>
      <div v-if="!!panelShowOptions.length">
        <recycle-scroller
          v-slot="{ item, index }"
          :items="panelShowOptions"
          :item-size="32"
          key-field="value"
          :buffer="100"
          :style="{ height: isResultPanel && showResultSearch ? '296px' : '325px' }"
        >
          <div class="cascader-panel__menu__item">
            <el-checkbox
              :value="item.checked"
              :indeterminate="item.indeterminate"
              :disabled="item.disabled"
              @change="checked => handleSelectChange(checked, item)"
            ></el-checkbox>
            <div
              :title="item.label"
              class="menu-item"
              :class="{'menu-item__danger' : item.colorDangerField, 'menu-item__active': panelActiveList[props.curPanelLevel] && item.value === panelActiveList[props.curPanelLevel].value}"
              v-html="highLightLabel(item.label)"
              @click="emit('clickMenuItem', item)"
            ></div>
          </div>
        </recycle-scroller>
      </div>
      <div v-else class="cascader-panel__menu__empty">{{ props.emptyText }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useSelect } from '../composable/use-select.js'
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const emit = defineEmits(['clickMenuItem', 'removeSelectedCate'])

const props = defineProps({
  isResultPanel: {
    type: Boolean,
    default: false
  },
  showResultSearch: {
    type: Boolean,
    default: true
  },
  showResultCount: { // 展示已选数量
    type: Boolean,
    default: true
  },
  curPanelLevel: {
    type: Number,
    default: 0
  },
  cascaderMaxLevel: {
    type: Number,
    default: 2
  },
  panelMenuTitle: { // 当前面板标题
    type: String,
    default: ''
  },
  emptyText: { // 当前面板无数据时展示的文本
    type: String,
    default: '暂无数据'
  },
  panelOptions: { // 当前面板展示的条目
    type: Array,
    default: () => ([])
  },
  multiple: { // 当前面板是否支持多选
    type: Boolean,
    default: true
  },
  supportSelectAll: { // 当前面板是否支持全选
    type: Boolean,
    default: true
  },
  panelActiveList: {
    type: Array,
    default: () => ([])
  },
  globalSearchWord: {
    type: String,
    default: ''
  }
})

const panelStatus = computed(() => {
  const totalLength = panelShowOptions.value.length
  const checkNum = panelShowOptions.value.filter(it => it.checked)?.length
  return {
    indeterminate: !!checkNum && checkNum !== totalLength,
    checked: !!checkNum && checkNum === totalLength
  }
})
const resultSearchKey = ref('')

const panelShowOptions = computed(() => {
  return props.panelOptions?.filter(it => !resultSearchKey.value || it.label.includes(resultSearchKey.value))
})

const { handleSelectAll, handleSelectChange } = useSelect(emit)

const highLightLabel = (label) => {
  let _search = props.isResultPanel ? resultSearchKey.value : props.globalSearchWord
  return _search ? label.split(_search).join(`<span style="color: #266BF6">${_search}</span>`) : label
}

</script>
