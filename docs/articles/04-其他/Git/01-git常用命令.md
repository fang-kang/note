# git 常用命令

## 1.基本 Git 命令

### 1. git init

这可能是你在`Git`中启动新项目所使用的第一个命令。此命令将创建一个空白的新存储库，然后你可以将源代码存储在此存储库中。

用法:

```bash
git init
```

或者，你也可以在`git init`命令中使用存储库名称。

```bash
git init <your repository name>
```

### 2. git config

此命令可设置身份——`Name`和`Email`地址。并且每次提交时会使用此信息。

用法:

```bash
git config --global user.name "Your name"
git config --global user.email "Your email"
```

### 3. git version

检查你使用的是哪个版本的`Git`

用法:

```bash
git version
```

### 4. git clone

`git clone`命令将使用现有的存储库进行复制。`git init`和`git clone`之间有一个主要区别。

在你需要在现有的存储库上进行复制时，使用`git clone`。`git clone`命令首先在内部使用`git init`命令，然后检出所有内容。

用法:

```bash
git clone <your project URL>
```

### 5. git add

`git add`命令会把所有新的代码文件或修改后的文件添加到存储库中。此命令提供了添加文件和文件夹的不同选项。

用法:

将单个文件添加到暂存区

```bash
git add your_file_name
```

此选项会将所有修改过的文件和新文件添加到暂存区

```bash
git add *
```

### 6. git commit

`git commit`会将更改添加到本地存储库。

用法:

```bash
git commit -m "your useful commit message"
```

绕过`githooks`检测

```bash
git commit -m "your useful commit message" --no-verify
```

### 7. git status

使用此`Git`命令可以方便地查看有多少文件需要得到关注。你可以随时运行此命令。

此命令可以用来在`git add`和`git commit`之间查看状态。

用法:

```bash
git status
```

### 8. git branch

可以用来列出分支,创建分支和删除分支.

用法:

(i)列出所有分支：

```bash
git branch
```

(ii)创建新的分支：

```bash
git branch <branch_name>
```

(iii)删除分支：

```bash
git branch -d <branch_name>
```

### 9. git checkout

用于在分支之间进行切换。

用法:

```bash
git checkout <branch_name>
```

此外，你也可以创建和检出到分支，用法如下

```bash
git checkout -b <your_new_branch_name>    # 创建并切换到新的分支.
```

## 2.中级 Git 命令

### 10. git remote

此命令会将你的本地存储库连接到远程。

用法:

```bash
git remote add <shortname> <url>
```

举例

```bash
git remote add origin git@github.com:fang-kang/note.git
```

其他命令

```bash
git remote     # 列出remote aliases.
         # 如果你clone一个project,Git会自动将原来的url添加进来,别名就叫做:origin.
git remote -v   # 可以看见每一个别名对应的实际url.
git remote add [alias] [url]  # 添加一个新的remote repo.
git remote rm [alias]      # 删除一个存在的remote alias.
git remote rename [old-alias] [new-alias]    # 重命名.
git remote set-url [alias] [url]  # 更新url. 可以加上—push和fetch参数,为同一个别名set不同的存取地址.
```

### 11. git push

（借助`git remote`命令）与远程存储库连接之后，就需要将更改推送到存储库。

用法:

```bash
git push -u <short_name> <your_branch_name>
```

举例

```bash
git push -u origin feature_branch
```

### 12. git push --set-upstream

在使用`git push`之前，我们应该先设置好`origin`和`upstream`。下面是设置`upstream`的命令。

用法:

```bash
git push --set-upstream <short_name> <branch_name>
```

举例

```bash
git push --set-upstream origin feature_branch
```

### 13. git fetch

当需要下载其他团队成员的更改时，就得使用`git fetch`。

此命令会下载有关提交、引用等的所有信息，因此你可以在将这些更改应用于本地存储库之前对其进行检查。

用法:

```bash
git fetch
```

### 14. git pull

`git pull`命令下载内容（而不是元数据），并立即用最新的内容更新本地存储库。

用法:

```bash
git pull <remote_url>
```

### 15. git stash

此 git 命令会临时存储已修改的文件。你可以使用以下 Git 命令处理 stash 工作。

用法:

```bash
git stash
```

可以使用以下命令查看所有 stash

```bash
git stash list
```

如果你需要应用 stash 到分支，那就使用`apply`

```bash
git stash apply
```

```bash
git stash drop      # 删除上一个,也可指定参数删除指定的一个项目.
git stash clear     # 删除所有项目.
```

### 16. git log

在`git log`的帮助下，你可以看到所有之前的提交，并且最近的提交出现在最前面。

用法

```bash
git log
```

默认情况下，它将显示当前已检出分支的所有提交，但是你可以强制通过所有选项来查看所有分支的所有提交。

```bash
git log --all
```

```bash
git log –oneline –number        #每条log只显示一行,显示number条.
git log –oneline –graph        #可以图形化地表示出分支合并历史.
git log branchname          #可以显示特定分支的log.
git log –oneline branch1 ^branch2,  #可以查看在分支1,却不在分支2中的提交.^表示排除这个分支
git log –decorate           #会显示出tag信息.
git log –author=[author name]     #可以指定作者的提交历史.
git log –since –before –until –after  #根据提交时间筛选log.
git log –no-merges          #可以将merge的commits排除在外.
git log –grep             #根据commit信息过滤log: git log –grep=keywords
```

### 17. git shortlog

`git shortlog`命令会显示来自`git log`命令的摘要。如果你只对简短的摘要感兴趣，那么此命令就非常有用了。

这个命令有助于查看谁处理了什么，因为它对作者及其提交进行了分组。

用法:

```bash
git shortlog
```

### 18. git show

与`git log`相比，此命令将显示有关特定提交的详细信息。

用法:

```bash
git show <your_commit_hash>
```

### 19. git rm

有时你需要从代码库中删除文件，在这种情况下，可以使用`git rm`命令。

它可以从索引和工作目录中删除跟踪的文件。

用法:

```bash
git rm <your_file_name>
```

### 20. git merge

把一个分支`merge`进当前的分支.

用法:

```bash
git merge [alias]/[branch_name]
```

此命令会将`<branch_name>`合并到当前你选择的分支中。

## 3.高级 Git 命令

### 21. git rebase

`git rebase`类似于`git merge`命令。它把两个分支集成到一个分支中，但有一个不一样的地方：`git rebase`命令将会重写提交记录。

当你有多个私有分支合并到单个分支时，应使用`git rebase`命令。它将使得提交历史成为线性的。

用法:

```bash
git rebase <base>
```

### 22. git bisect

`git bisect`命令可帮助查找糟糕的提交。

用法:

i）启动`git bisect`

```bash
git bisect start
```

ii）让`git bisect`知道什么是好的提交

```bash
git bisect good a123
```

iii）让`git bisect`知道什么是糟糕的提交

```bash
git bisect bad z123
```

通过`git bisect`，只要几分钟你就可以缩小问题代码的范围。

### 23. git cherry-pick

`git cherry-pick`允许你从任意分支中选择任意提交并将其应用于其他任意分支。

用法:

```bash
git cherry-pick commit-id         # 挑选一个commit-id合并
git cherry-pick commit-idA commit-idB   # 挑选多个commit-id合并
git cherry-pick commit-idA..commit-idB  # 挑选连续的多个commit-id合并
```

::: warning 注意

该指令是将从 commit-idA 开始到 commit-idB 之间的所有 commit-id 提交记录都合并过来，需要注意的是，commit-idA 必须比 commit-idB 提前提交，也就是说在被挑选的分支上，先有的 commit-idA，然后才有的 commit-idB

:::

`git cherry-pick`不会修改存储库的历史记录；相反，它会添加到历史记录。

#### git cherry-pick 高级用法

使用上面的指令基本上可以玩转很大部分的场景，但是总有一些我们预想不到或者相对不是很丝滑的场景

##### 1.合并冲突

- 在实际合并的过程中，总有一些冲突的情况，遇到这些情况下，该如何使用 cherry-pick 的组合命令来解决问题?
- 首先在使用 cherry-pick 时，如果遇到了代码冲突，其实合并过程会停止，需要使用其他的方式来继续对应的操作

##### 2.继续合并--continue

- 第一步：需要合并人解决对应的冲突文件，然后提交到暂存区

```bash
git add .
```

- 第二步：使用下面的命令继续执行

```bash
git cherry-pick --continue
```

##### 3.放弃合并，回归原始状态--abort

- 使用当前的指令，合并的动作暂停，并且回归到操作前的样子

```bash
git cherry-pick --abort
```

##### 4.放弃合并，保留状态 --quit

- 使用当前的指令，会保留车祸现场，退出 cherry-pick

```bash
git cherry-pick --quit
```

### 24. git archive

`git archive`命令会把多个文件合并为单个文件。就好像 zip 实用程序一样，所以你可以提取存档文件以获取单个文件。

用法:

```bash
git archive --format zip HEAD > archive-HEAD.zip
```

它将创建当前修订的 zip 存档。

### 25. git pull --rebase

在大多数情况下，当你使用`git pull`时，你需要重新设置基准（并且不进行合并）。

此时，你就可以使用此选项。

用法:

```bash
git pull --rebase
```

这将帮助保持干净的历史记录。另外，还可以避免多次合并。

### 26. git blame

如果你需要逐行检查任意文件的内容，则需要使用`git blame`命令。它可以帮助确定是谁对文件进行了更改。

用法:

```bash
git blame <your_file_name>
```

### 27. git tag

在 Git 中，标签很有用，你可以使用它们来管理发布。你可以将`git tag`视为不会改变的分支。尤其是要公开发布的时候，则更为重要了。

用法:

查看本地 tag

```bash
git tag -l
```

查看远程 tag

```bash
git ls-remote --tags origin
```

新建本地 tag

```bash
git tag -a '版本号' -m '备注xxxx'
```

推送本地 tag 到远程 tag

```bash
git push origin '版本号'
```

推送本地所有 tag 到远程

```bash
git tag origin --tags
```

删除本地 tag

```bash
git tag -d '版本号'
```

删除本地所有 tag

```bash
git tag -l | xargs git tag -d
```

删除远程 tag

```bash
git push origin :refs/tags/版本号
```

删除远程所有 tag

```bash
git show-ref --tag | awk '{print ":" $2}' | xargs git push origin
```

### 28. git verify-commit

`git verify-commit`命令将检查 gpg 签名。GPG，GNU Privacy Guard，是 sign 文件中使用的工具，包含签名。

用法:

```bash
git verify-commit <commit>
```

### 29. git verify-tag

可以以同样的方式确认标签。

用法:

```bash
git verify-tag <tag>
```

### 30. git diff

大多数情况下，在提交或推送之前，你需要比较两个 git 文件或分支。用这个命令就方便多了。

用法:

i）将工作目录与本地存储库进行比较：

```bash
git diff HEAD <filename>
```

ii）比较两个分支：

```bash
git diff <source branch> <target branch>
```

### 31. git citool

`git citool`是 Git 提交的图形化替代。

用法:

```bash
git citool
```

### 32. git mv

重命名 git 文件。接受两个参数，源文件名和目标文件名。

用法:

```bash
git mv <old-file-name> <new-file-name>
```

### 33. git clean

你可以使用`git clean`命令处理未跟踪的文件。可以使用此命令从工作目录中删除所有未跟踪的文件。如果要处理跟踪的文件，则需要使用`git reset`命令。

用法:

```bash
git clean
```

### 34. git help

Git 中有许多命令，如果你需要其他命令的帮助，则可以随时在终端上使用`git help`。

用法:

```bash
git help <git_command>
```

### 35. git revert

反转撤销提交.只要把出错的提交(commit)的名字(reference)作为参数传给命令就可以了.

git revert 会创建一个反向的新提交,可以通过参数-n 来告诉 Git 先不要提交.

用法:

```bash
git revert HEAD # 撤销最近的一个提交.
```
 
 