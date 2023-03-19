# git 必备命令-子模块

## 1. 首次拉取带子仓库的代码方法

仓库一起拉取：

```bash
git clone --recurse-submodules 父仓库地址
```

分开拉取：

```bash
git clone 父仓库地址

git submodule init // 初始化子模块
git submodule update // 更新子模块与主仓库中的子模块代码同步
// or
git submodule update --init
// or 嵌套的(子仓库中包含子仓库)
git submodule update --init --recursive
```

## 2. 更新、拉取子仓库代码方法

父目录中：

```bash
git submodule update // 与主仓库中的子模块代码同步
git submodule update --remote // 与子仓库中代码同步（同步所有的子模块）
git submodule update --remote xxx // 指定需要同步的子模块
```

子模块目录下更新：

```bash
git pull
```

默认情况下会跟踪子模块的 master 分支

## 3.删除 submodule

1.删除 `.gitmodules` 文件中相关的内容

2.删除`.git/config` 文件中相关内容

3.删除缓存

```bash
git rm --cached path_to_submodule (no trailing slash)
```

4.删除 `.git/modules`下面目录

```bash
rm -rf .git/modules/path_to_submodule (no trailing slash)
```

5.删除 子目录

```bash
rm -rf path_to_submodule
```

6.提交更改

```bash
git commit -m "chore: remove submodule"
```
 
 