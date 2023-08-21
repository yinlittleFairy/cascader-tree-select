<template>
  <div class="cascader-result">
    <cascader-panel
      is-result-panel
      :cascaderMaxLevel="1"
      :show-result-search="props.showResultSearch"
      :show-rsult-count="props.showResultCount"
      :panel-options="props.resultOptions"
      :cur-panel-level="0"
      v-on="$listeners"
    ></cascader-panel>
  </div>
</template>

<script setup>
import CascaderPanel from './cascader-panel.vue'
const props = defineProps({
  resultOptions: {
    type: Array,
    default: () => ([])
  },
  showResultSearch: {
    type: Boolean,
    default: true
  },
  showResultCount: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>

</style>
