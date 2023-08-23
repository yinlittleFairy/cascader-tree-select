<template>
  <div class="cascader-tree-select__demo__module">
    <div style="margin-bottom: 20px">部分自定义props示例</div>
    <el-form :model="model">
      <el-form-item label="needSearch(是否需要搜索功能)：">
        <el-radio-group v-model="model.needSearch">
          <el-radio :label="true">true</el-radio>
          <el-radio :label="false">false</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="needResultPanel(是否需要结果面板)：">
        <el-radio-group v-model="model.needResultPanel">
          <el-radio :label="true">true</el-radio>
          <el-radio :label="false">false</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="ancestorHitShow(当前节点命中，子节点无论命中与否全部展示)：">
        <el-radio-group v-model="model.ancestorHitShow">
          <el-radio :label="true">true</el-radio>
          <el-radio :label="false">false(如果节点本身命中，但子节点无一命中，则当前节点不展示)</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: Object,
    default: () => ({})
  }
})
const model = computed(() => {
  return props.value
})
</script>
