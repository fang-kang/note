import { ConfigEnv, defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss'
import { SearchPlugin } from 'vitepress-plugin-search'
import { VitePluginVitepressDemo } from 'vite-plugin-vitepress-demo'
import flexSearchIndexOptions from 'flexsearch'
import { resolve } from 'path'

export default defineConfig((env: ConfigEnv) => {
  return {
    build: {
      chunkSizeWarningLimit: 2000,
    },
    plugins: [
      vueJsx(),
      VitePluginVitepressDemo({ glob: './**/demo/**/*.{vue,jsx,tsx,js,ts}' }),
      Unocss({
        shortcuts: [
          [
            'btn',
            'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
          ],
        ],
        presets: [presetUno(), presetAttributify(), presetIcons(), presetTypography()],
        theme: {
          preflightBase: false,
        },
      }),
      [
        SearchPlugin({
          ...flexSearchIndexOptions,
          previewLength: 100, //搜索结果预览长度
          buttonLabel: '搜索',
          placeholder: '情输入关键词',
          tokenize: 'full',
        }),
      ],
    ],
    server: {
      hmr: {
        overlay: false,
      },
      fs: {
        allow: [resolve(__dirname, '..')],
      },
    },
    ssr: {},
  }
})
