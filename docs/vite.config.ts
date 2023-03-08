import { ConfigEnv, defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
// import { SearchPlugin } from 'vitepress-plugin-search'
import { presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss'
import { VitePluginVitepressDemo } from 'vite-plugin-vitepress-demo'
import { resolve } from 'path'

export default defineConfig((env: ConfigEnv) => {
  return {
    build: {
      chunkSizeWarningLimit: 4096,
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
      // SearchPlugin({
      //   tokenize: 'full', // 解决汉字不能多个输入
      // }),
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
