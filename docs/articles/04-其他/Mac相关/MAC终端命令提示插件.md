# Mac 终端命令提示插件

### 1.按照官网的推荐指令进行安装

依次执行

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
```

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git
```

```bash
echo "source ${(q-)PWD}/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ${ZDOTDIR:-$HOME}/.zshrc
```

### 2.打开.zshrc 脚本文件

```bash
vim ~/.zshrc
```

### 3.在.zshrc 末尾添加以下两行命令

```bash
source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh
source ./zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
```

### 4.执行

```bash
source ~/.zshrc
```
 
 