# react 使用 craco 配置

## 1. 为什么使用 craco

[craco 官网](https://craco.js.org/)

使用 `create-react-app` 创建的项目默认是无法修改其内部的 `webpack` 配置的，不像 `vue-cli` 那样可以通过一个配置文件修改。 虽然有一个 `eject` 命令可以是将配置完全暴露出来，但这是一个不可逆的操作，同时也会失去 `CRA` 带来的便利和后续升级。
如果想要无 `eject` 重写 `CRA` 配置，目前成熟的是下面这几种方式

- 通过 CRA 官方支持的 `--scripts-version` 参数，创建项目时使用自己重写过的 `react-scripts` 包
- 使用 `react-app-rewired` + `customize-cra` 组合覆盖配置
- 使用 `craco` 覆盖配置

  这里我们选择的是使用 `craco` 覆盖配置。

## 2. 安装

现在我们安装 `craco` 并修改 `package.json` 里的 `scripts` 属性。

```shell
yarn add @craco/craco -D
```

```json
{
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test"
  }
}
```

然后在项目根目录创建一个 `craco.config.js` 用于修改默认配置。

## 3. 配置

### 3.1 配置别名

> 目的：配置`@`路径别名简化路径处理

**craco.config.js**

```js
const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}
```

**jsconfig.json 或者 tsconfig.json**

> 目的：能够让 vscode 识别`@`路径并给出路径提示

因为项目使用了 ts，而 ts 带有配置文件`tsconfig.json`。vscode 会自动读取`tsconfig.json` 中的配置，让 vscode 知道 `@` 就是 `src` 目录

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 3.2 配置 antd 实现按需加载打包

安装 antd

```shell
yarn add antd
```

安装 babel 插件

```shell
yarn add babel-plugin-import -D
```

```js
module.exports = {
  babel: {
    plugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }]],
  },
}
```

### 3.3 自定义主题

按照 配置主题 的要求，自定义主题需要用到类似 `less-loader` 提供的 `less` 变量覆盖功能。我们可以引入 `craco-less` 来帮助加载 `less` 样式和修改变量。

首先把 `src/App.css` 文件修改为 `src/App.less`，然后修改样式引用为 `less` 文件。

```js
/* src/App.js */
- import './App.css';
+ import './App.less';
```

```less
/* src/App.less */
- @import '~antd/dist/antd.css';
+ @import '~antd/dist/antd.less';
```

然后安装 `craco-less` 并修改 `craco.config.js` 文件如下。

```shell
yarn add craco-less less less-loader -D
```

```js
const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
```

这里利用了 `less-loader` 的 `modifyVars` 来进行主题配置。修改后重启 `yarn start`，如果看到一个绿色的按钮就说明配置成功了。

### 3.4 配置跨域处理

```js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://baidu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
```

### 3.5 配置 less module

一般情况下，react 项目我们都是用 css module 来处理样式的隔离，类似 vue 中的 scoped，避免全局样式污染。

create-react-app 为我们提供了开箱即用的 sass module，不用安装即可使用。less 则是需要配置一下。

#### 3.5.1 第一种方法

这种方法只需要安装 对应的 plugin

```shell
yarn add craco-plugin-scoped-css craco-scoped-less -D
```

```js
module.exports = {
  plugins: [
    {
      plugin: require('craco-plugin-scoped-css'),
    },
    {
      plugin: require('craco-scoped-less'), // 若使用css或scss可不安装和引入该依赖
    },
  ],
}
```

#### 3.5.2 第二种方法

这种方法是手动写规则

```js
// craco.config.js
const CracoLessPlugin = require('craco-less')

const lessModuleRegex = /\.module\.less$/

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        // less loader options
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },

        // A callback function that receives two arguments: the webpack rule,
        // and the context. You must return an updated rule object.
        modifyLessRule: (lessRule, context) => {
          lessRule.test = lessModuleRegex
          lessRule.exclude = /node_modules|antd\.css/
          return lessRule
        },

        // Passing an options object to configure the css-loaders
        cssLoaderOptions: {
          modules: { localIdentName: '[local]_[hash:base64:5]' },
        },
      },
    },
  ],
}
```

创建样式文件 并引用即可(需重启项目)

::: tip
文件名的格式需要满足 [name].scoped.less / [name].scoped.css / [name].scoped.scss
:::

### 3.6 配置 postcss-px-to-viewport-8-plugin

```shell
yarn add postcss-px-to-viewport-8-plugin -D
```

```js
module.exports = {
  style: {
    postcss: {
      mode: 'extends',
      loaderOptions: {
        postcssOptions: {
          ident: 'postcss',
          plugins: [
            [
              'postcss-px-to-viewport-8-plugin',
              {
                viewportWidth: 375, // 设计稿的视口宽度
              },
            ],
          ],
        },
      },
    },
  },
}
```

### 3.7 配置打包文件带时间后缀

```js
const CracoLessPlugin = require('craco-less')

const path = require('path')

const dayjs = require('dayjs')

const packageDateObj = new Date()
const packageTime = dayjs(packageDateObj).format('YYYYMMDDHHmmss')

const namePath = `${packageTime}-[name]`

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve('src'),
    },
    configure: (webpackConfig, { env, paths }) => {
      const isEnvProduction = env === 'production'

      const addTimeStampToCss = () => {
        if (webpackConfig.plugins) {
          const miniCssExtractPlugin = webpackConfig.plugins.find(
            plugin => plugin.constructor.name === 'MiniCssExtractPlugin'
          )
          if (miniCssExtractPlugin) {
            miniCssExtractPlugin.options.filename = `static/css/${namePath}.css`
            miniCssExtractPlugin.options.chunkFilename = `static/css/${namePath}.css`
          }
        }
      }

      webpackConfig.resolve.extensions = ['.jsx', '.js', '.tsx', '.ts', '.less', '.css']

      webpackConfig.optimization.splitChunks = {
        ...webpackConfig.optimization.splitChunks,
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            name: 'chunk-commons',
          },
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true,
          },
        },
        chunks: 'all',
      }

      webpackConfig.devtool = isEnvProduction ? false : 'source-map'

      if (isEnvProduction) {
        webpackConfig.output.filename = `static/js/${namePath}.js`
        webpackConfig.output.chunkFilename = `static/js/${namePath}.js`
        addTimeStampToCss()
      }

      return webpackConfig
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: require('craco-scoped-less'), // 若使用css或scss可不安装和引入该依赖
    },
  ],
  babel: {
    plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]],
  },
}
```
