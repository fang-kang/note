<template>
  <div class="gitalk-container">
    <div id="gitalk-container"></div>
  </div>
</template>

<script lang="ts" setup name="GitTalk">
import md5 from 'md5'
import Gitalk from 'gitalk'
import 'gitalk/dist/gitalk.css'
import { onMounted } from 'vue'

onMounted(() => {
  const commentConfig: Gitalk.GitalkOptions = {
    clientID: '3483fbba08ddb94205aa',
    clientSecret: 'e6febe7411a833980cfb326d18980a208a83ad77',
    repo: 'note',
    owner: 'fang-kang',
    admin: ['fang-kang'],
    id: md5(location.pathname) as string,
    distractionFreeMode: false,
    language: 'zh-CN',
  }
  const gitalk = new Gitalk(commentConfig)
  gitalk.render('gitalk-container')
})
</script>

<style>
.gt-container .gt-header-textarea {
  color: #000;
}
.dark .gt-container .gt-header-textarea {
  background-color: #1a1a1a;
}
.dark .gt-container .gt-header-preview {
  background-color: #1a1a1a;
  color: #fff;
}
.dark .gt-container .gt-header-textarea {
  color: #fff;
}
.dark .gt-container .gt-comment-admin .gt-comment-content {
  background-color: #1a1a1a;
}
.dark .gt-container .gt-comment-body {
  color: #fff !important;
}
</style>
