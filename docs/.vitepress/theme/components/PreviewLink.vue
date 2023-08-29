<template>
  <li @click="visible = !visible">
    <a href="#">{{ label }}</a>
  </li>
  <ElDialog v-model="visible" :title="label" width="100%" modal-class="full-modal" fullscreen>
    <iframe :src="url" border="none" style="width: 100%; height: 100%" />
  </ElDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElDialog } from 'element-plus'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
})

const visible = ref<boolean>(false)
</script>

<style lang="less">
.full-modal {
  .el-dialog__body {
    height: calc(90vh);
  }
}
</style>
