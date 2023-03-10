import { defineConfig } from 'vitepress'
import { getSidebarData, getNavData } from './navSidebarUtil'
import updateInfo from './watchJson.json'
import mdItCustomAttrs from 'markdown-it-custom-attrs'
import { description, github, keywords, name } from './meta'
import socialLinks from './link'
// import algolia from './algolia'

console.log('【updateInfo】', updateInfo)

export default defineConfig({
  title: name,
  description,
  markdown: {
    lineNumbers: false,
    config: md => {
      md.use(mdItCustomAttrs, 'image', {
        'data-fancybox': 'gallery',
      })
    },
  },
  head: [
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
    ['meta', { 'http-equiv': 'pragma', content: 'no-cache' }],
    ['meta', { 'http-equiv': 'Expires', content: '0' }],
    ['meta', { name: 'keywords', content: keywords }],
    ['meta', { name: 'author', content: 'fk' }],
    ['meta', { property: 'og:type', content: 'article' }],
    ['meta', { name: 'application-name', content: name }],
    ['meta', { name: 'apple-mobile-web-app-title', content: name }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js' }],
  ],
  base: '/note/',
  lang: 'zh-CN',
  lastUpdated: false,
  themeConfig: {
    logo: '/logo.svg',
    socialLinks,
    // algolia,
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '最后更新',
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '归档',
    editLink: {
      pattern: `${github}/tree/main/docs/:path`,
      text: '在 GitHub 上编辑此页',
    },
    outlineTitle: '导航栏',
    outline: 'deep',
    nav: getNavData({ enableDirActiveMatch: true }),
    sidebar: getSidebarData(),
  },
})
