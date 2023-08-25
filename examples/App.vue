<template>
  <div id="app" class="cascader-tree-select__demo">
    <prop-form v-model="propModel" />
    <div class="cascader-tree-select__demo__module">
      <cascader-tree-select
        :panelTitleList="['一级标题', '二级标题', '三级标题', '四级标题']"
        :options="cateOptions"
        :needSearch="propModel.needSearch"
        :cascaderMaxLevel="propModel.cascaderMaxLevel"
        :needResultPanel="propModel.needResultPanel"
        :ancestorHitShow="propModel.ancestorHitShow"
        @change="handleChange"
        ref="cascaderTreeSelectRef"
      ></cascader-tree-select>
    </div>
    <div class="cascader-tree-select__demo__module">
      <div class="result-tips">注：change事件返回数据逻辑是如果当前节点下的所有子节点全部选中，则返回当前节点的路径；如果未全部选中，则返回选中的子节点的路径，以此类推</div>
      <div class="result-tips">你将通过change事件得到的数据是：<span style="color: red">{{ resultValue }}</span></div>
    </div>
    </div>
</template>

<script setup>
import CascaderTreeSelect from '../src/index.vue'
import PropForm from './prop-form.vue'
import Mock from 'mockjs'
import 'element-ui/lib/theme-chalk/index.css'
import { onMounted, reactive, ref, watch } from 'vue'

const cascaderTreeSelectRef = ref(null)
const propModel = reactive({
  needSearch: true,
  needResultPanel: true,
  ancestorHitShow: true
})
const cateOptions = ref([])

onMounted(() => {
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
                value: '@increment()'
              }
            ]
          }
        ]
      }
    ]
  })
  cateOptions.value = _mock.array
})

const resultValue = ref([])

const handleChange = (result) => {
  resultValue.value = result
}

watch(() => propModel, () => {
  cascaderTreeSelectRef.value?.initMenuStore(cateOptions.value, [])
}, { deep: true })

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
    .result-tips {
      color: #393C5A;
      margin-bottom: 20px;
      font-size: 14px;
    }
  }
}
</style>
