# .gitignore 忽略文件的用法

## 1.Git 忽略文件 `.gitignore` 详解

在工程中，并不是所有文件都需要保存到版本库中的，例如`dist`目录及目录下的文件就可以忽略。在 `Git` 工作区的根目录下创建一个特殊的 `.gitignore` 文件，然后把要忽略的文件名填进去，`Git` 就会自动忽略这些文件或目录。

## 2.忽略语法

1.注释使用#开头，后面跟注释内容

```bash
# 注释
```

2.! 开头的模式表示反向操作，该文件将会再次被包含，如果忽略了该文件的父级目录，则使用 ! 也不会使该文件再次被包含

```bash
!/bin/run.sh    表示不忽略bin目录下的run.sh文件
```

3./ 结束的模式只匹配文件夹以及在该文件夹路径下的内容，但是不匹配该文件

```bash
build/          表示忽略 build/目录下的所有文件，过滤整个build文件夹
```

4./ 开始的模式匹配项目根目录

```bash
/TODO           表示仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
```

5.如果一个模式不包含斜杠，则它匹配相对于当前 .gitignore 文件路径的内容（目录和文件），如果该模式不在 .gitignore 文件中，则相对于项目根目录

```bash
config.php:     表示忽略当前路径的 config.php 文件
```

6.** 匹配多级目录，可在开始，中间，结束

```bash
**/foo:         表示忽略/foo,a/foo,a/b/foo等
a/**/b:         表示忽略a/b, a/x/b,a/x/y/b等
```

7.? 通用匹配单个字符

```bash
?.log.    表示忽略所有 1.log 文件
```

8.\* 通用匹配零个或多个字符

```bash
doc/*.txt       表示会忽略doc/notes.txt但不包括 doc/server/arch.txt
/*.c:           表示忽略cat.c，不忽略 build/cat.c
*.log:          表示忽略所有 .log 文件
```

9.[] 通用匹配单个字符列表

## 3.已被推送过的文件

已经推送（push）过的文件，在.gitignore 文件内添加是无效的。可以使用以下命令进行强制忽略。

```bash
git update-index --assume-unchanged 文件路径
```

取消强制忽略：

```bash
git update-index --no-assume-unchanged 文件路径
```

## 4.参考链接

- [https://www.cnblogs.com/kevingrace/p/5690241.html](https://www.cnblogs.com/kevingrace/p/5690241.html)

- [https://blog.csdn.net/fox9916/article/details/127924115](https://blog.csdn.net/fox9916/article/details/127924115)
