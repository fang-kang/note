# Macos 端口占用

## 1.问题描述

偶然发现关闭 node 服务之后，再起启动，一直启动不了，提示端口占用

## 2.报错信息

```bash
Error: listen EADDRINUSE: address already in use 0.0.0.0:8000
```

## 3.解决办法

终端输入 `sudo lsof -i:端口号`（端口号换成你的），查看到被占用 `PID` 后，再输入 `sudo kill -9 pid` （pid 换成上一步查看的数据）即可杀死进程

## 4.参考链接

- [https://www.cnblogs.com/jiaoshou/p/16333590.html](https://www.cnblogs.com/jiaoshou/p/16333590.html)
 
 