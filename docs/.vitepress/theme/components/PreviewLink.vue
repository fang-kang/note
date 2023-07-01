<template>
  <li @click="visible = !visible">
    <a href="#">{{ label }}</a>
  </li>
  <a-modal v-model:visible="visible" :title="label" width="100%" wrap-class-name="full-modal" :footer="null">
    <iframe :src="url" border="none" style="width: 100%; height: 100%" />
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
  height: 100vh;
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
}
</style>
