# VitePress 首页随机生成花里胡哨的背景图

## 实现

新建一个组件，放在首页某个插槽里。如放在 `#home-hero-after` 中。

首先在 `template` 中建立 `Canvas` 画布，并定义好样式：

`.vitepress/theme/components/Canvas`

```vue
<template>
  <canvas
    class="canvas"
    ref="canvasRef"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
  />
</template>

<script>
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}
export default {
  name: 'Canvas',
  props: {
    globalCompositeOperation: {
      type: String,
      default: 'lighter',
    },
  },
  data() {
    return {
      ctx: null,
    }
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.canvasRef
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = width
      canvas.height = height
      this.ctx = canvas.getContext('2d')
      this.ctx.clearRect(0, 0, width, height)
      if (this.globalCompositeOperation) {
        this.ctx.globalCompositeOperation = this.globalCompositeOperation
      }
    },
    generateParams() {
      const width = window.innerWidth
      const height = window.innerHeight
      const emptyX = width > 400 ? 50 : 0
      const emptyYFront = height > 550 ? 300 : 50
      const emptyYRear = height > 640 ? 120 : 0
      const r = getRandomInt(10, 25)
      const x = getRandomInt(emptyX, width - r * 2 - emptyX)
      const y = getRandomInt(emptyYFront, height - r * 2 - emptyYRear)
      const red = getRandomInt(0, 255)
      const green = getRandomInt(0, 255)
      const blue = getRandomInt(0, 255)
      const opacity = Math.random() * 0.05 + 0.05
      const color = `rgba(${red}, ${green}, ${blue}, ${opacity})`
      const isStroke = Math.random() > 0.5
      return { x, y, r, color, isStroke }
    },
    drawRect() {
      const { x, y, r, color, isStroke } = this.generateParams()
      if (isStroke) {
        this.ctx.strokeStyle = color
        this.ctx.strokeRect(x, y, r * 2, r * 2)
      } else {
        this.ctx.fillStyle = color
        this.ctx.fillRect(x, y, r * 2, r * 2)
      }
    },
    drawArc() {
      const { x, y, r, color, isStroke } = this.generateParams()
      this.ctx.beginPath()
      if (isStroke) {
        this.ctx.strokeStyle = color
        this.ctx.arc(x, y, r, 0, 2 * Math.PI)
        this.ctx.stroke()
      } else {
        this.ctx.fillStyle = color
        this.ctx.arc(x, y, r, 0, 2 * Math.PI)
        this.ctx.fill()
      }
      this.ctx.closePath()
    },
    resize() {
      this.initCanvas()
      const width = window.innerWidth
      const density = width > 640 ? 50 : 15
      for (let i = 0; i < density; i++) {
        this.drawArc()
      }
      for (let i = 0; i < density; i++) {
        this.drawRect()
      }
    },
  },
  mounted() {
    this.resize()
    this.resize = this.resize.bind(this)
    window.addEventListener('resize', this.resize)
  },
  beforeDestory() {
    window.removeEventListener('resize', this.resize)
  },
}
</script>

<style scoped>
.canvas {
  width: 100%;
  height: 100%;
  display: block;
  background: transparent;
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
}
</style>
```

`.vitepress/theme/components/Hero`

```vue
<script setup>
import Canvas from './Canvas.vue'
</script>

<template>
  <Canvas />
</template>
```

`.vitepress/theme/components/Layout`

```vue
<script setup>
import DefaultTheme from 'vitepress/theme'
import Hero from './Hero.vue'
import Utterances from './Utterances.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-after>
      <Hero />
    </template>

    <template #doc-after>
      <Utterances />
    </template>
  </Layout>
</template>
```

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
