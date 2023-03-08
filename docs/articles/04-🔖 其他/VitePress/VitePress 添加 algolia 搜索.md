# VitePress 添加 algolia 搜索

## 1.账号与创建应用

需要再 algolia 官网 注册一个账号，或者直接选择以 GitHub 身份登录。

![](asserts/2.png)

登录之后会进入控制台页面，点击右上角头像，会有一个设置选项，之后来到 Applications 这里，去创建一个应用，以我自己的为例，下图已经创建好了「chodocs」。

![](asserts/3.png)

## 2.获取 key

如图下所示，进入 API Keys 页面。

![](asserts/4.png)

会看到如下界面，一个是可公开的，`Search-Only API Key` 是待会我们在 VitePress 项目中会使用的，而 `Admin API Key` 是用于一会[爬虫](https://so.csdn.net/so/search?q=爬虫&spm=1001.2101.3001.7020)的 key，因为是私有的，所以一会放在 Github Secrets 中。

![](asserts/5.png)

## 3.在文档中填写 key

在上一步我们获取了公开的 key，在这里我们就来配置一下，将上述的 `Search-Only API Key` 填到 apiKey 字段中，**私有的 key 不要填！**

修改文件在 `docs/.vitepress/config` 文件中

```js
algolia: {
  appId: 'RDDxxx', // Application ID
  apiKey: '9302dbxxx', // Search-Only API Key
  indexName: 'chodocs', // 为你自己填的index
  placeholder: '请输入关键词',
  buttonText: '搜索',
}
```

## 4.私钥放在 Github Secrets 中

将上述获取的 `Admin API Key` 和 `Application ID` 分别添加到 Github Secrets 中，如下图所示，创建 `API_KEY` 和 `APPLICATION_ID` 两个字段，一会在 ci 中会使用到。

![](asserts/6.png)

## 5.创建 crawlerConfig.json

在项目的根目录下创建 `crawlerConfig.json` 文件，内容如下，注意前两个字段需要进行替换。这是告诉 `algolia` 需要爬取的配置。

```json
{
  "index_name": "note", // 填写自己的索引名称
  "start_urls": ["https://fang-kang.github.io/note/"], // 填写自己的网站地址
  "rateLimit": 8,
  "maxDepth": 10,
  "selectors": {
    "lvl0": {
      "selector": "",
      "defaultValue": "Documentation"
    },
    "lvl1": ".content h1",
    "lvl2": ".content h2",
    "lvl3": ".content h3",
    "lvl4": ".content h4",
    "lvl5": ".content h5",
    "content": ".content p, .content li"
  },
  "selectors_exclude": ["aside", ".page-footer", ".next-and-prev-link", ".table-of-contents"],
  "js_render": true
}
```

## 6.编写 CI 脚本

在项目根目录`.github/workflows` 文件夹下，创建 `algolia.yml` 文件（名称可更改，自定义），粘贴如下内容：

```yaml
name: algolia
on:
  push:
    branches:
      - main
jobs:
  algolia:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Get the content of algolia.json as config
        id: algolia_config
        run: echo "config=$(cat crawlerConfig.json | jq -r tostring)" >> $GITHUB_OUTPUT
      - name: Push indices to Algolia
        uses: signcl/docsearch-scraper-action@master
        env:
          APPLICATION_ID: ${{ secrets.APPLICATION_ID }}
          API_KEY: ${{ secrets.API_KEY }}
          CONFIG: ${{ steps.algolia_config.outputs.config }}
```

:::tip

解释一下：这里 yml 就是使用 Github Actions 在 Docker 中执行的 AlgoliaDocSearch scraper action，当我们推送到 main 分支时就会立即执行这个任务，当然如果你是 master 分支只需要修改 branches 那里的值即可。

:::

## 7.配置好后搜索不生效

原因：

![](asserts/8.jpg)

## 8.依旧使用 algolia

基于官方的（也是上文图中最后一段所说）DocSearch 来爬取数据，申请地址如下：

[申请地址](https://docsearch.algolia.com/apply/)

> 如果表单提交不成功，需要使用科学上网。

这里有几点需要注意：

- 您必须是该网站的所有者，或至少有更新其内容的权限
- 你的网站必须是公开的
- 你的网站必须是一个开源项目或技术博客的技术文档，不授权于商业内容
- 你的网站必须到生产环境

其实一般是 GitHub 上的开源项目都会申请通过的，我是大概等了 2 天样子，会收到如下类似的邮件回复，根据 key 和 id 来替换过去旧的即可。

![](asserts/7.jpg)

## 7.参考链接

- [https://blog.csdn.net/weixin_42429718/article/details/128361258](https://blog.csdn.net/weixin_42429718/article/details/128361258)
