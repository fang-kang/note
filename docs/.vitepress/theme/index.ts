import { type Theme } from 'vitepress'
import { AntdTheme } from 'vite-plugin-vitepress-demo/theme'
import DefaultTheme from 'vitepress/theme'
// @ts-ignore
import GitTalk from './components/GitTalk.vue'
import 'uno.css'
import './styles/index.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Demo', AntdTheme)
    app.component('GitTalk', GitTalk)
  },
  setup() {},
} as Theme
