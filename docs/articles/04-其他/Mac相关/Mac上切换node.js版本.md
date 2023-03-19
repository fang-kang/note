# Mac 上切换 node.js 版本

## 一.使用 Nvm 切换版本

### 命令

1.查看 node 所有版本

```bash
nvm ls-remote
```

2.使用本地最新 node 环境

```bash
nvm use node
```

3.安装指定版本 node

```bash
nvm install 17.3.0
```

4.查看已经安装到本地的 node 版本

```bash
nvm ls
```

5.指定版本 node 环境

```bash
nvm use 17.3.0
```

```bash
nvm alias default 16.13.0
```

### 常用命令

- nvm list 查看已经安装的版本
- nvm list installed 查看已经安装的版本
- nvm list available 查看网络可以安装的版本
- nvm version 查看当前的版本
- nvm install 安装最新版本nvm
- nvm use <version>## 切换使用指定的版本node</version>
- nvm ls 列出所有版本
- nvm current显示当前版本
- nvm alias <name><version>## 给不同的版本号添加别名</version></name>
- nvm unalias <name>## 删除已定义的别名</name>
- nvm reinstall-packages <version>## 在当前版本node环境下，重新全局安装指定版本号的npm包</version>
- nvm on 打开nodejs控制
- nvm off 关闭nodejs控制
- nvm proxy 查看设置与代理
- nvm node_mirror [url] 设置或者查看setting.txt中的node_mirror，如果不设置的默认是 [https://nodejs.org/dist/](https://links.jianshu.com/go?to=https%3A%2F%2Fnodejs.org%2Fdist%2F)
- nvm npm_mirror [url] 设置或者查看setting.txt中的npm_mirror,如果不设置的话默认的是： [https://github.com/npm/npm/archive/](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fnpm%2Fnpm%2Farchive%2F).
- nvm uninstall <version>卸载制定的版本</version>
- nvm use [version] [arch] 切换制定的node版本和位数
- nvm root [path] 设置和查看root路径
- 注：nvm 只能查看和切换 通过nvm 安装的 node 环境，通过其他方式安装的node 不能查看

## 二.使用 n 切换版本

### 安装

```bash
sudo npm install -g n
```

### 常用命令

1.查看帮助

```bash
n help
```

2.列出所有 node 版本

```bash
n ls
```

3.安装某个版本

```bash
n 14.3.0 //版本号
```

4.安装最新版本

```bash
n lastest
```

5.安装稳定版本

```bash
n stable
```

6.切换已安装版本

```bash
n // 然后上下键切换 然后回车确定。
```

7.同时切换 node 和 npm 版本

```bash
sudo n
```

8.删除某个版本

```bash
n rm 14.3.0//版本号
```
 
 
 <git-talk/>