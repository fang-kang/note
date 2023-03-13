# 用 pnpm 管理 Monorepo 项目

## 1. 什么是 Monorepo ?

`Monorepo`是管理项目代码的方式之一，指在一个大的项目仓库（repo）中 管理多个模块/包（package），这种类型的项目大都在项目根目录下有一个 packages 文件夹，分多个项目管理。大概结构如下：

```bash
├── packages
|   ├── pkg1
|   |   ├── package.json
|   ├── pkg2
|   |   ├── package.json
├── package.json
```

目前很很多大型项目采用这样的结构，比如：`Babel`、`vue3`和`vite`等。

Monorepo 的好处在哪里嘞？

- **统一管理**。比如微前端项目，多个子应用可以放在同一个`monorepo`中方便管理；后端用`node.js`的项目放在`monorepo`中也可以使用同一套技术栈管理。在 CI/CD 等流水线过程中，方便统一迭代或升级版本，也方便做通用化的配置，适用到多个子项目当中。
- **依赖提升**。如果多个项目都依赖了诸如`react`、`vue`或`TypeScript`等常用库，那可以通过`lerna`或者`yarn workspace`将依赖提升到最外层，多个子模块/包复用同一个依赖，减小项目体积。

## 2. 什么是 pnpm

快速的，节省磁盘空间的包管理工具

### 2.1 Pnpm 的优点

- 快速: pnpm 比替代方案快 2 倍
- 高效: Node_modules 中的文件是从一个单一的可内容寻址的存储中链接过来的
- 支持: monorepospnpm 内置支持了单仓多包
- 严格: pnpm 创建了一个非平铺的 node_modules，因此代码无法访问任意包

### 2.2 pnpm 安装(更新)

```bash
npm i -g pnpm
```

### 2.3 pnpm 常用命令

#### 查看版本

```bash
pnpm -v
```

#### 初始化项目

```bash
pnpm init <project_name>
```

#### 添加依赖包

```bash
pnpm add [package]@[version]
```

#### 升级依赖包

```bash
pnpm up                //更新所有依赖项
pnpm upgrade [package] // 升级到最新版本
pnpm upgrade [package]@[version] // 升级到指定版本
pnpm upgrade [package]@[tag] // 升级到指定tag
```

#### 移除依赖包

```bash
pnpm remove [package]              // 移除包
pnpm remove 包 --global            //移除全局包
```

### 2.4 pnpm 设置源

#### 查看源

```bash
pnpm config get registry
```

#### 切换淘宝源

```bash
pnpm config set registry https://registry.npmmirror.com
```

#### 临时修改

```bash
pnpm --registry https://registry.npmmirror.com install any-touch
```

#### 还原

```bash
pnpm config set registry https://registry.npmjs.org
```

## 3. 快速开始

先全局安装一个 `pnpm`，然后通过：

```bash
pnpm init
```

创建一个项目——在本例中，我们实现一个前后端分离、共同管理的 demo。

首先，我们需要理解 pnpm 中的工作区，在 pnpm 中可以通过创建并配置 pnpm-workspace.yaml 设置 workspace：

```yaml
packages:
  - 'packages/**'
```

上面这段配置的意思就是通过 glob 语法将`packages`下的所有文件夹都当做一个 package，添加到 monorepo 中进行管理。

接下来，我们就按照配置，创建`packages`文件夹，并在其目录中创建三个子项目，分别是：web 端、node 端和工具类。

```bash
├── packages
│   ├── server
│   ├── tools
│   └── web
```

### **3.1. 全局依赖**

我们知道不管是一个 web 项目还是一个 node 项目，它都是基于同一种语言编写，所以我们可以只安装一次 TypeScript，供三个项目使用，这就体现出了 monorepo 的优势。

类似于`TypeScript`或`lodash`这样通用的依赖，我们通常可以把他们安装到根目录，即使用下面这条命令：

```bash
pnpm install typescript -D -W
```

这里的`-D`指令大家都很熟悉，就是把依赖作为`devDependencies`安装；而`-W`就是把依赖安装到根目录的`node_modules`当中，目录结构大致如下：

```bash
├── node_modules
│   ├── @types
│   └── typescript -> .pnpm/typescript@4.4.4/node_modules/typescript
├── package.json
├── packages
│   ├── server
│   ├── tools
│   └── web
├── pnpm-lock.yaml
└── pnpm-workspace.yaml
```

虽然 packages 下的项目都没有安装 ts，但是倘若在项目中使用到，就会通过依赖递归查找的原则逐级往上寻找，自然会找到 monorepo 中根目录的依赖。

### **3.2. 局部依赖**

对于某些依赖，可能仅存在于某几个 package 中，我们就可以单独为他们安装，当然，可以通过`cd packges/xxx`后，执行`pnpm install xxx`，但这样重复操作多次未免有些麻烦，pnpm 提供了一个快捷指令——filter。

比如我们只在 web 应用中用到`vue`，那就可以为它单独安装。首先要拿到它的 package name，这个是我们在子项目中自定义的，通常是”@命名空间+包名@“的方式，比如`@vite/xx`或`@babel/xx`，在本例中，我们都以@test 开头。那么命令如下：

```bash
pnpm install vue -r --filter @test/web
```

在`packages/web/package.json`中，我们可以看到：

```json
"dependencies": {
    "vue": "^3.0.4"
  }
```

同时，该子项目的`node_modules`中也可以看到`vue`被添加了进来。

### **3.3. link 机制**

在 monorepo 中，我们往往需要 package 间的引用，比如本例中的`@test/tools`就会被`@test/server`和`@test/web`依赖。

我们可以使用类似于 3.2 中的方法安装：

```bash
pnpm i @test/tools -r --filter @test/server @test/web
```

在执行前，我们可以添加一个函数，比如：

```js
export const getNow = () => new Date().getTime()
```

导出一个函数后，我们执行刚才的安装指令，这时在项目中会以`workspace`的版本体现。我们查看 web 项目中的 package.json：

```json
  "dependencies": {
    "@test/tools": "workspace:^1.0.0", // 通过 workspace 为本地引用
    "vue": "^3.0.4"
  },
```

通过软链接引用了我们的 tools package，我们就可以使用了正常的引入和调用了！

```js
import { getNow } from '@test/tools'

getNow()
```

使用 VSCode 自带的快速跳转，我们可以直接跳转到 tools 源代码定义文件中，这样就巧妙地运用了 monorepo 的优势。

这时你会有一个疑问：当这样的工具包被发布到平台后，如何识别其中的`workspace`呢？

实际上，当执行了`pnpm publish`后，会把基于的 workspace 的依赖变成外部依赖，如：

```json
// before
"dependencies": {
    "@test/tools": "workspace:^1.0.0"
  },
// after
"dependencies": {
    "@test/tools": "^1.0.0"
  },
```

解决了开发环境和生产环境对依赖的问题。

#### 发布 workspace 包

当 workspace 包打包到归档（无论它是通过 `pnpm pack` ，还是 `pnpm publish` 之类的发布命令）时，我们将动态替换这些 `workspace:` 依赖：

- 目标 workspace 中的对应版本（如果使用 `workspace:*`, `workspace:~`, or `workspace:^`）
- 相关的 semver 范围（对于任何其他范围类型）

看一个例子，假设我们的 workspace 中有 `foo`、 `bar`、 `qar`、 `zoo` 并且它们的版本都是 `1.5.0`，如下：

```json
{
  "dependencies": {
    "foo": "workspace:*",
    "bar": "workspace:~",
    "qar": "workspace:^",
    "zoo": "workspace:^1.5.0"
  }
}
```

将会被转化为：

```json
{
  "dependencies": {
    "foo": "1.5.0",
    "bar": "~1.5.0",
    "qar": "^1.5.0",
    "zoo": "^1.5.0"
  }
}
```

### **3.4. 启动与开发**

一个 monorepo 往往是一个整体的项目，所以我们需要同时执行多个指令，在 pnpm 中，可以通过`-C`进行配置：

```json
"scripts": {
    "start": "pnpm -C ./packages/server start:server & pnpm -C ./packages/web dev",
  }
```

这条命令的含义就是同时运行服务端和前端代码。

而`start:server`和`dev`都是我们在子项目的`scripts`中自己配置的。

如果经过了 git 合码后，项目的依赖变化比较大，可以配置一条 clean 指令：

```json
  "scripts": {
    "clean": "rm -rf node_modules **/*/node_modules",
  }
```

这样根目录和子应用下的`node_modules`都会被删除。再次执行`pnpm install`也会同时为根目录和所有 package 安装需要的依赖。

在实际开发中，我们往往会纠结什么样的代码应该放在业务项目中，什么样的代码要单独抽离为一个 package。举几个很简单的例子：

- 对于一个大型的应用我们通常需要定制一套组件库，那么我们就可以把组件库最基础的部分抽离成 package，在业务代码中进行二次业务封装，这样在其他的项目也能复用。
- 如果一个项目包含 PC 和 H5，我们不妨把这两类项目拆分成不同的 package。
- 如果你在打造一个工具，而它具备了 parser、render 等能力，那也可以将不同的能力解耦到不同的 package 当中。
