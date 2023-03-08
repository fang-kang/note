# 关于 Workflows Action 部署 vuepress 报错

## 项目场景

笔记(vuepress)部署采用自动部署文档的 Github 工作流。

## 报错信息

```bash
Error: The deploy step encountered an error: The process '/usr/bin/git' failed with exit code 128 ❌
Notice: Deployment failed! ❌
```

## 原因分析

默认情况下，新存储库没有适当的工作流权限。

## 解决方案

转到存储库 Setting

选择 Actions>>>General

在"工作流权限(Workflow permissions)"中，选择 Read and write permissions

![](asserts/1.png)
