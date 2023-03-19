# git commit 格式校验

## 1.Commitizen（规范 commit 命令行工具）

安装

```zsh
npm i commitizen -g
```

### cz-conventional-changelog

#### 使用方式（二者选其一即可）

- 全局安装使用

```zsh
npm i cz-conventional-changelog -g
```

全局模式下，需要 `~/.czrc` 配置文件, 为 `commitizen` 指定 `Adapter`。

```zsh
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

- 项目中使用 运行下面的命令，使其支持 `Angular` 的 `Commit Message` 格式

```zsh
commitizen init cz-conventional-changelog --save --save-exact
```

**注意 ⚠️**：已经通过全局方式配置的话！输入上面命令会报错（如下图）

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa6c61a63c944bcf8a68d623ae918ce0~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

**解决**：如果还是想要在项目中配置，可以按提示添加 `--force` 强制覆盖全局配置

```zsh
commitizen init cz-conventional-changelog --save --save-exact --force
```

输入上面命令后在项目根目录 `package.json` 文件内 **会自动生成** 配置信息并安装 `cz-conventional-changelog`

```json
"devDependencies": {
    "cz-conventional-changelog": "^3.3.0"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
```

### commit 提交

`commit`的时候使用 `git cz` 就可以根据生成自动化的提示 `commit message` 进行选择操作了

`git cz`进入 `interactive` 模式，根据提示依次填写

```zsh
1. Select the type of change that you're committing 选择改动类型 (<type>)

2. What is the scope of this change (e.g. component or file name)? 填写改动范围 (<scope>)

3. Write a short, imperative tense description of the change: 写一个精简的描述 (<subject>)

4. Provide a longer description of the change: (press enter to skip) 对于改动写一段长描述 (<body>)

5. Are there any breaking changes? (y/n) 是破坏性修改吗？默认 n (<footer>)

6. Does this change affect any openreve issues? (y/n) 改动修复了哪个问题？默认 n (<footer>)
```

## 2.Commitlint & Husky（规范 commit message 验证）

> - `commitlint`: 用于检查提交信息;
> - `husky` 是 `hook` 工具，作用于 `git-commit` 和 `git-push` 阶段

### 依赖安装

```zsh
npm i husky @commitlint/config-conventional @commitlint/cli -D
```

### 配置信息

#### commitlint 配置

根目录下新建 `commitlint.config.js` 配置文件，也可以在 `package.json` 文件内配置(二者选其一)

**commitlint.config.js 文件**

**`rules` 也可以不添加使用默认的 `rules` 配置**

[更多 rules 配置信息](https://link.juejin.cn?target=https%3A%2F%2Fcommitlint.js.org%2F%23%2Freference-rules)

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'], // body 开始于空白行
    'header-max-length': [2, 'always', 72], // header 字符最大长度为 72
    'subject-full-stop': [0, 'never'], // subject 结尾不加 '.'
    'type-empty': [2, 'never'], // type 不为空
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新特性、需求
        'fix', // bug 修复
        'docs', // 文档内容改动
        'style', // 不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
        'refactor', // 代码重构
        'test', // 添加或修改测试
        'chore', // 不修改 src 或者 test 的其余修改，例如构建过程或辅助工具的变动
        'revert', // 执行 git revert 打印的 message
      ],
    ],
  },
}
```

**package.json 文件**

```json
{
  "commitlint": {
    "extends": ["@commitlint/config-conventional"]
  }
}
```

#### husky 配置

**旧 `husky` 配置，我试了下好像没啥效果, 可以使用下面新的配置**

**package.json 文件**

```json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

**新的 `husky` 配置**

**Active Hooks**

执行下面命令会生成一个 `.husky` 文件夹

```zsh
npx husky install
```

**Add Hooks**

向 `.husky` 文件那添加内容

```zsh
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
```

## 3.Conventional-changelog-cli (自动生成 CHANGELOG 文件信息)

### 安装

```zsh
npm install -g conventional-changelog-cli
```

### 命令配置与执行

将命令配置到 `package.json` 文件 `script` 中

```json
{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s"
  }
}
```

执行 `npm run changelog`,可以自动生成 `CHANGELOG.md` 文件

```zsh
npm run changelog
```

> 注：在每次执行 `npm run changelog` 命令自动生成 `CHANGELOG.md`, 之前需要按 `SemVer` 规范 [更新版本](https://juejin.cn/post/6932803368226127886)。 否则，会导致增量生成的 `CHANGELOG` 一直都有之前的 `commit` 记录。

如果这是您第一次使用此工具，并且想要生成所有以前的变更日志，则可以执行：

```bash
conventional-changelog -p angular -i CHANGELOG.md -s -r 0
```
 
 