# VitePress 添加评论

## 1.gitalk

### 1.1 首先获取 clientID 和 clientSecret

在`github`官网右上角`/Settings/Developer settings/OAuth Apps`中创建应用
第一个应用名随意，两个 URL 设置成网站网址
创建成功后获取`clientID`和`clientSecret`

### 1.2 安装

```bash
npm i md5 gitalk -D
```

默认`gitalk`存在黑色模式下字体白色，背景色也是白色，导致看不见字体，所以样式里设置一下

```vue
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
    clientID: '',
    clientSecret: '',
    repo: '仓库名',
    owner: '账户名',
    admin: ['账户名'],
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
```

### 1.3 注册全局组件

`.vitepress/theme/index.ts`

```typescript
import { type Theme } from 'vitepress'
import { AntdTheme } from 'vite-plugin-vitepress-demo/theme'
import DefaultTheme from 'vitepress/theme'
// @ts-ignore
import GitTalk from './components/GitTalk.vue'
// @ts-ignore
import Layout from './components/Layout.vue'
import 'uno.css'
import './styles/index.css'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Demo', AntdTheme)
    app.component('GitTalk', GitTalk)
  },
  setup() {},
} as Theme
```

### 1.4 放到全局组件 Layout 中

`.vitepress/theme/compontent/Layout.vue`

```vue
<script setup>
import DefaultTheme from 'vitepress/theme'
import GitTalk from './GitTalk.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-after>
      <GitTalk />
    </template>
  </Layout>
</template>
```

## 2.utteranc

[官网](https://utteranc.es/)

### 2.1 新建组件

`.vitepress/theme/compontent/Utterances`

```vue
<template>
  <div id="comment"></div>
</template>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const utterances = window.document.createElement('script')
  utterances.type = 'text/javascript'
  utterances.async = true
  utterances.setAttribute('issue-term', 'title')
  utterances.setAttribute(
    'theme',
    [...document.documentElement.classList].includes('dark') ? 'github-dark' : 'github-light'
  )
  utterances.setAttribute('repo', 'fang-kang/note')
  utterances.crossOrigin = 'anonymous'
  utterances.src = 'https://utteranc.es/client.js'
  window.document.getElementById('comment').appendChild(utterances)
  // 切换主题时同步，防止切到暗色主题还是白色
  document.querySelector('.VPSwitchAppearance').addEventListener('click', () => {
    const isDark = [...document.documentElement.classList].includes('dark')
    const theme = isDark ? 'github-dark' : 'github-light'
    console.log(theme, 'theme')
    console.log(isDark, 'isDark')
    const message = {
      type: 'set-theme',
      theme: theme,
    }
    const utteranc = document.querySelector('.utterances-frame')
    utteranc.contentWindow.postMessage(message, 'https://utteranc.es')
  })
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
```

### 2.2 注册全局组件

`.vitepress/theme/index.ts`

```typescript
import { type Theme } from 'vitepress'
import { AntdTheme } from 'vite-plugin-vitepress-demo/theme'
import DefaultTheme from 'vitepress/theme'
// @ts-ignore
import Utterances from './components/Utterances.vue'
// @ts-ignore
import Layout from './components/Layout.vue'
import 'uno.css'
import './styles/index.css'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Demo', AntdTheme)
    app.component('Utterances', Utterances)
  },
  setup() {},
} as Theme
```

### 2.3 放到全局组件 Layout 中

`.vitepress/theme/compontent/Layout.vue`

```vue
<script setup>
import DefaultTheme from 'vitepress/theme'
import Utterances from './Utterances.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-after>
      <Utterances />
    </template>
  </Layout>
</template>
```
