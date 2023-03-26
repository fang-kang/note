# rollup 总结

## 什么是 rollup？

rollup 是一个 JavaScript 模块打包器，在功能上要完成的事和 webpack 性质一样，就是将小块代码编译成大块复杂的代码，例如 library 或应用程序。在平时开发应用程序时，我们基本上选择用 webpack，相比之下，rollup.js 更多是用于 library 打包，我们熟悉的 vue、react、vuex、vue-router 等都是用 rollup 进行打包的。

## rollup 安装

首先是安装：

```bash
npm i rollup -D
```

## 打包一个 js 文件

新建一个项目，并安装 rollup，创建两个文件：hello.js 和 index.js

```json
"dev": "rollup -i src/index.js -o dist/bundle.js -f es"
```

在这段指令中：

- `-i`指定要打包的文件，`-i`是`--input`的缩写。
- `src/index.js`是`-i`的参数，即打包入口文件。
- `-o`指定输出的文件，是`--output.file`或`--file`的缩写。(如果没有这个参数，则直接输出到控制台)
- `dist/bundle.js`是`-o`的参数，即输出文件。
- `-f`指定打包文件的格式，`-f`是`--format`的缩写。
- `es`是`-f`的参数，表示打包文件使用 ES6 模块规范。

## 6 种格式分别适合在什么场景使用？

`rollup` 支持的打包文件的格式有 `amd`, `cjs`, `es\esm`, `iife`, `umd`、`system`。其中，`amd` 为 `AMD` 标准，`cjs` 为 `CommonJS` 标准，`esm\es` 为 `ES` 模块标准，iife 为立即调用函数， `umd` 同时支持 `amd`、`cjs` 和 `iife`。

- **IIFE:** 适合部分场景作为 SDK 进行使用，尤其是需要把自己挂到 `window` 上的场景。
- **CommonJS:** 仅 node.js 使用的库。
- **AMD:** 只需要在浏览器端使用的场景。
- **UMD:** 既可能在浏览器端也可能在 node.js 里使用的场景。
- **SystemJs:** 和 UMD 类似。目前较出名的 `Angular` 用的就是它。
- **ESM:** 1. 还会被引用、二次编译的场景（如组件库等）；2.浏览器调试场景如 `vite.js`的开发时。3.对浏览器兼容性非常宽松的场景。

## rollup 配置文件

在项目开发中，我们通常会使用配置文件，这不仅可以简化命令行操作，同时还能启用 rollup 的高级特性。

在项目根目录下创建`rollup.config.js`。

```js
export default {
  input: './src/index.js',
  output: [
    {
      file: './dist/index-umd.js',
      format: 'umd',
      name: 'myLib',
      //当入口文件有export时，'umd'和'iife'格式必须指定name
      //这样，在通过<script>标签引入时，才能通过name访问到export的内容。
    },
    {
      file: './dist/index-es.js',
      format: 'es',
    },
    {
      file: './dist/index-cjs.js',
      format: 'cjs',
    },
  ],
}
```

使用 Rollup 的配置文件，可以使用`rollup --config`或者`rollup -c`指令。

```json
//修改package.json的script字段
"dev": "rollup -c"                 // 默认使用rollup.config.js
"dev": "rollup -c my.config.js"    //使用自定义的配置文件，my.config.js
```

## rollup 插件

上面我们知道了 rollup 的基础用法，在实际应用中，会有很多更复杂的需求，比如，怎样支持 es6 语法，怎样打包.vue 文件，怎样压缩我们 js 的代码等等。在 rollup 中，我们借助插件来完成。

在 webpack 中，使用 loader 对源文件进行预处理，plugin 完成构建打包的特定功能需求。rollup 的 plugin 兼具 webpack 中 loader 和 plugin 的功能。

### rollup-plugin-babel

`rollup-plugin-babel`用于转换 es6 语法。

将`src/hello.js`中的内容改写成：

```js
export const hello = () => {
  console.log('hello world')
}
```

在未使用 babel 插件的情况下,打包之后箭头函数仍然未转换

使用 babel 插件：

```bash
npm i rollup-plugin-babel @babel/core @babel/preset-env -D
```

```js
//rollup.config.js
import babel from 'rollup-plugin-babel'
export default {
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
}
```

在项目根目录创建`.babelrc`文件。

```json
{
  "presets": [["@babel/preset-env"]]
}
```

再次打包之后转换为 ES5 的写法

### rollup-plugin-polyfill-node

使用 rollup 打包的时候，想把 assert、path、util、fs 模块这些模块以代码的方式打包导入，最简单的方式是在 rollup.config.js 中使用**rollup-plugin-polyfill-node**

```bash
npm i rollup-plugin-polyfill-node -D
```

```js
//rollup.config.js
import nodePolyfills from 'rollup-plugin-polyfill-node'
export default {
  plugins: [nodePolyfills()],
}
```

### rollup-plugin-commonjs

rollup 默认是不支持 CommonJS 模块的，自己写的时候可以尽量避免使用 CommonJS 模块的语法，但有些外部库的是 cjs 或者 umd（由 webpack 打包的），所以使用这些外部库就需要支持 CommonJS 模块。

新建一个`src/util.js`文件，内容如下：

```js
module.exports = {
  a: 1,
}
```

在`src/index.js`中引入`util.js`

```js
import util from './util'
console.log(util.a)
```

`npm run dev`打包会报错

这就需要使用`rollup-plugin-commonjs`，首先，`npm i rollup-plugin-commonjs -D`.

在`rollup.config.js`中加入：

```js
import commonjs from 'rollup-plugin-commonjs'
export default {
  plugins: [commonjs()],
}
```

再`npm run dev`打包，没有报错。

我们还可以在代码使用 require 引入模块：

```js
// src/index.js
const util = require('./util')
console.log(util.a)
```

`rollup-plugin-commonjs`可以识别 require 语法，并打包成 es 模块语法，打包的出的`index-lib-es.js`的内容如下：

```js
var util = {
  a: 1,
}

console.log(util.a)

var src = {}

export default src
```

### rollup-plugin-postcss

处理 css 需要用到的插件是`rollup-plugin-postcss`。它支持 css 文件的加载、css 加前缀、css 压缩、对 scss/less 的支持等等。

首先，安装，`npm i rollup-plugin-postcss -D`，然后在`rollup.config.js`中配置：

```js
import postcss from 'rollup-plugin-postcss'
export default {
  plugins: [postcss()],
}
```

### css 加前缀

借助`autoprefixer`插件来给 css3 的一些属性加前缀。安装`npm i autoprefixer@8.0.0 -D`，配置：

```js
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
export default {
  plugins: [
    postcss({
      plugins: [autoprefixer()],
    }),
  ],
}
```

使用`autoprefixer`除了以上配置，还需要配置 browserslist，有 2 种方式，一种是建立.browserslistrc 文件，另一种是直接在 package.json 里面配置，我们在 package.json 中，添加"browserslist"字段。

```json
"browserslist": [
  "defaults",
  "not ie < 8",
  "last 2 versions",
  "> 1%",
  "iOS 7",
  "last 3 iOS versions"
]
```

### css 压缩

cssnano 对打包后的 css 进行压缩。使用方式也很简单，和 autoprefixer 一样，安装`cssnano`，然后配置。

```js
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default {
  plugins: [
    postcss({
      plugins: [autoprefixer(), cssnano()],
    }),
  ],
}
```

### 抽离单独的 css 文件

`rollup-plugin-postcss`可配置是否将 css 单独分离，默认没有`extract`，css 样式生成`style`标签内联到 head 中，配置了`extract`，就会将 css 抽离成单独的文件。

```js
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default {
  plugins: [
    postcss({
      plugins: [autoprefixer(), cssnano()],
      extract: 'css/index.css',
    }),
  ],
}
```

当然，在页面也需要单独引入打包好的 css 文件。

### 支持 scss/less

实际项目中我们不太可能直接写 css，而是用 scss 或 less 等预编译器。`rollup-plugin-postcss`默认集成了对 scss、less、stylus 的支持，在我们项目中，只要配置了`rollup-plugin-postcss`，就可以直接使用这些 css 预编译器，很方便的。

### rollup-plugin-vue

rollup-plugin-vue 用于处理.vue 文件。**vue2 和 vue3 项目所用的 rollup-plugin-vue 版本不一样，vue 的编译器也不一样**。

- vue2：`rollup-plugin-vue^5.1.9` + `vue-template-compiler`
- vue3：`rollup-plugin-vue^6.0.0` + `@vue/compiler-sfc`

以 vue2 为例：

```bash
npm i rollup-plugin-vue@5.1.9 vue-template-compiler -D
```

在`rollup.config.js`中加入`rollup-plugin-vue`

```js
import vue from 'rollup-plugin-vue'
export default {
  plugins: [vue()],
}
```

`rollup-plugin-vue`也是默认支持 scss、less、stylus，可以在项目中直接使用。给.vue 文件中的 css 自动加前缀，需要在`rollup-plugin-vue`中配置。更多配置参考[rollup-plugin-vue](https://link.zhihu.com/?target=https%3A//rollup-plugin-vue.vuejs.org/options.html%23style-postcssoptions)

```js
import vue from 'rollup-plugin-vue'
import autoprefixer from 'autoprefixer' //同样要配置browserslist
import cssnano from 'cssnano'
export default {
  plugins: [
    vue({
      style: {
        postcssPlugins: [autoprefixer(), cssnano()],
      },
    }),
  ],
}
```

### rollup-plugin-terser

在生产环境中，代码压缩是必不可少的。我们使用`rollup-plugin-terser`进行代码压缩。

```js
import { terser } from 'rollup-plugin-terser'
export default {
  plugins: [terser()],
}
```

在上面的过程中，我们都是打包好文件，然后通过 script 引入，或 npm link 然后在别的项目中调试，这更像是组件库的调试方法。如果我们用 rollup 打包一个应用，它能否像 webpack 那样热更新呢？答案是可以的。我们需要借助`rollup-plugin-serve`和`rollup-plugin-livereload`。

### rollup-plugin-serve、rollup-plugin-livereload

这两个插件常常一起使用，`rollup-plugin-serve`用于启动一个服务器，`rollup-plugin-livereload`用于文件变化时，实时刷新页面。

```js
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
export default {
  plugins: [
    serve({
      contentBase: '', //服务器启动的文件夹，默认是项目根目录，需要在该文件下创建index.html
      port: 8020, //端口号，默认10001
    }),
    livereload('dist'), //watch dist目录，当目录中的文件发生变化时，刷新页面
  ],
}
```

我们需要在 index.html 手动加入打包后的文件，js 或者 css，因为此时并没有自动注入。然后访问`http://localhost:8020`就可以看到 index.html 中的内容。

然而，此时修改 src 中的文件，页面并不会实时刷新，因为 dist 目录下的文件并没有更新。 rollup 监听源文件的改动很简单，就是在执行打包命令时，添加 `-w` 或者 `--watch`

```json
//package.json
"scripts": {
   "dev": "rollup -wc"
},
```

### 引入外部资源

当项目中引入外部资源时，如 `npm` 包，rollup 不知道如何打破常规去处理这些依赖。

有 2 种方法引入外部资源：

- 添加插件 @rollup/plugin-node-resolve 将我们编写的源码与依赖的第三方库进行合并；

- 配置 external 属性，告诉 rollup.js 哪些是外部的类库。

#### resolve 插件

`@rollup/plugin-node-resolve` 插件让 rollup 能够处理外部依赖。

```bash
npm i @rollup/plugin-node-resolve -D
```

```js
import resolve from '@rollup/plugin-node-resolve'
export default {
  plugins: [resolve()],
}
```

#### external 插件

每个类库都要手动添加至 externals 未免太麻烦，这时候可以用 `rollup-plugin-node-externals` 插件，自动将外部类库声明为 externals。

```bash
npm i rollup-plugin-node-externals -D
```

```js
import externals from 'rollup-plugin-node-externals'

export default {
  // devDependencies 类型的依赖就不用加到 externals 了
  plugins: [externals({ devDeps: false })],
}
```

### typescript 插件

```bash
npm i @rollup/plugin-typescript2 -D
```

```js
import typescript from '@rollup/plugin-typescript2'

export default {
  plugins: [typescript()],
}
```

#### 导出类型声明文件

```js
import typescript from "@rollup/plugin-typescript2";

export default {
 plugins: [typescript({ outDir: "dist", declaration: true, declarationDir: "dist" })];
}
```

或者配合`tsconfig.json`

```json
{
  "include": ["src/**/*"],
  "compilerOptions": {
    "target": "ES2015",
    "module": "ES6",
    "lib": ["ES2018", "ESNext", "DOM"],
    "declaration": true,
    "moduleResolution": "node",
    "declarationDir": "lib/types", // 生成的类型文件目录
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": false,
    "strictNullChecks": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "skipDefaultLibCheck": true,
    "baseUrl": "./"
  }
}
```

```js
import typescript from 'rollup-plugin-typescript2'

export default {
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true, // 使用tsconfig中的声明文件目录配置
    }),
  ],
}
```

### 打包产物清除调试代码

插件 `@rollup/plugin-strip` 用于从代码中删除 debugger 语句和函数。包括 assert.equal、console.log 等等。

```bash
npm i @rollup/plugin-strip -D
```

```js
import strip from '@rollup/plugin-strip'

export default {
  plugins: [strip()],
}
```

### 打包输出文件保留原始模块结构

```js
export default {
  output: [
    {
      file: './lib/index.cjs.js',
      format: 'cjs',
      exports: 'named',
    },
    {
      file: './lib/index.es.js',
      format: 'es',
      exports: 'named',
    },
  ],
}
```

### 按需加载

rollup 支持输出格式为 `es` 模块化，就会按模块输出。

所以我们上面的配置已经实现了按需加载了。
