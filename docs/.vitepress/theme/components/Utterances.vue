<template>
  <div id="comment"></div>
</template>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  let utterances = window.document.createElement('script')
  utterances.type = 'text/javascript'
  utterances.async = true
  utterances.setAttribute('issue-term', 'title')
  utterances.setAttribute('theme', 'github-light')
  utterances.setAttribute('repo', 'fang-kang/note')
  utterances.crossOrigin = 'anonymous'
  utterances.src = 'https://utteranc.es/client.js'
  window.document.getElementById('comment').appendChild(utterances)
})
</script>

<style>
.utterances {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 760px;
  margin-left: 0;
  margin-right: auto;
}

.utterances-frame {
  position: absolute;
  left: 0;
  right: 0;
  width: 1px;
  min-width: 100%;
  max-width: 100%;
  height: 100%;
  border: 0;
}
</style>
