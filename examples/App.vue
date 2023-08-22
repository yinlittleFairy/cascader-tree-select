<template>
  <div id="app" class="cascader-tree-select__demo">
    <prop-form v-model="propModel" />
    <div class="cascader-tree-select__demo__module">
      <cascader-tree-select
        :panelTitleList="['一级标题', '二级标题', '三级标题', '四级标题']"
        :options="_mock.array"
        :needSearch="propModel.needSearch"
        :cascaderMaxLevel="propModel.cascaderMaxLevel"
        :needResultPanel="propModel.needResultPanel"
        :ancestorHitShow="propModel.ancestorHitShow"
        @change="handleChange"
      ></cascader-tree-select>
    </div>
    <div class="cascader-tree-select__demo__module">
      <div style="margin-bottom: 20px">change事件返回数据逻辑是如果当前节点下的所有子节点全部选中，则返回当前节点的路径；如果未全部选中，则返回选中的子节点的路径，以此类推</div>
      <div>你将通过change事件得到的数据是：<span style="color: red">{{ resultValue }}</span></div>
    </div>
    </div>
</template>

<script setup>
import CascaderTreeSelect from '../src/index.vue'
import PropForm from './prop-form.vue'
import Mock from 'mockjs'
import { reactive, ref } from 'vue'

const _mock = Mock.mock({
  'array|100': [
    {
      label: '@csentence(6)',
      value: '@increment()',
      'children|10': [
        {
          label: '@csentence(6)',
          value: '@increment()',
          'children|10': [
            {
              label: '@csentence(6)',
              value: '@increment()',
            }
          ]
        }
      ]
    }
  ]
})

const propModel = reactive({
  needSearch: true,
  needResultPanel: true,
  ancestorHitShow: true,
  cascaderMaxLevel: 2,
})

const resultValue = ref([])

const handleChange = (result) => {
  resultValue.value = result
}
</script>

<style lang="less" scoped>
.cascader-tree-select__demo {
  height: calc(100vh - 120px);
  background: #F7F8FA;
  padding: 50px;
  &__module {
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 16px;
    background: #fff;
  }
}
</style>
