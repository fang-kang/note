# TortoiseGit clone 项目时报错

## 1.问题描述

使用TortoiseGit工具将gitee项目clone到本地目录时出现异常

## 2.报错信息

```shell
No supported authentication methods available (server sent: publickey)
```

![img](asserts/03.png)

## 3.解决办法

### 3.1 使用puttygen生成key公钥

![img](asserts/04.png)

### 3.2 点击generate生成公钥和私钥

![img](asserts/05.png)

执行一段时间之后如下

![img](asserts/06.png)

保存公钥和私钥到本地

![img](asserts/07.png)

我保存的位置

![img](asserts/08.png)

将公钥放到git账号上，路径：账号→settings→SSH and GPG keys

![img](asserts/09.png)

执行Add SSH key

![img](asserts/10.png)

### 3.3 使用Pageant程序配置私钥

运行 TortoiseGit 开始菜单中的Pageant程序，程序启动后将自动停靠在任务栏中，在任务栏中双击打开。

点击“Add Key”按钮，添加之前保存的私钥（.ppk），然后点击“Close”即可。它会默认在后台挂载私钥，如果程序退出，配置就会失效。

![img](asserts/11.png)

再执行git操作的时候，就不会报错了。

### 3.4 在设置中配置私钥，永久有效

在本地项目文件夹上右键，TortoiseGit -》Settings -》Git -》 Remote，在Putty Key后选择刚才保存到本地的私钥，然后点击应用即可。

![img](asserts/12.png)

在Pull或Push项目的时候，记得勾选 Autoload Putty Key选项。

![img](asserts/13.png)

最后就可以使用TortoiseGit可视化提交工具进行代码拉取提交等一系列操作了。