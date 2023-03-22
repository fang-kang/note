# Flutter IOS 真机调试报错

## 1.问题描述

Flutter 使用 XCode 真机调试报错

## 2.报错信息

```bash
Failed to register bundle identifier.
```

## 3.解决办法

1. 找到“Signing & Capabilities”
2. 找到“Bundle identifier”
3. 把“Bundle identifier”值中的“com.xxx”换成自己“com.xxx”
4. 找到“Buil Settings” 在里面搜索 “com.”或者 “Product Bundle Identifier”
5. 也把“com.xxx”换成自己“com.xxx”
