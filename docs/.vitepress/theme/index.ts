import { watch } from 'vue'
import { type Theme } from 'vitepress'
import { AntdTheme } from 'vite-plugin-vitepress-demo/theme'
import DefaultTheme from 'vitepress/theme'
// @ts-ignore
import Utterances from './components/Utterances.vue'
// @ts-ignore
import Layout from './components/Layout.vue'

import 'uno.css'
import './styles/index.css'

let homePageStyle: HTMLStyleElement | undefined

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp({ app, router }) {
    if (typeof window === 'undefined') return

    watch(
      () => router.route.data.relativePath,
      () => updateHomePageStyle(location.pathname === '/'),
      { immediate: true }
    )
    app.component('Demo', AntdTheme)
    app.component('Utterances', Utterances)
  },
  setup() {},
} as Theme

if (typeof window !== 'undefined') {
  // detect browser, add to class for conditional styling
  const browser = navigator.userAgent.toLowerCase()
  if (browser.includes('chrome')) document.documentElement.classList.add('browser-chrome')
  else if (browser.includes('firefox')) document.documentElement.classList.add('browser-firefox')
  else if (browser.includes('safari')) document.documentElement.classList.add('browser-safari')
}

// Speed up the rainbow animation on home page
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}
