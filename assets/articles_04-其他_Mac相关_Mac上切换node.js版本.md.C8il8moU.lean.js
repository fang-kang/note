import{_ as h,L as t,a as d,b as s,p as a,l as i,q as e,aR as p,o as r}from"./chunks/framework.kUD5hkPg.js";const I=JSON.parse('{"title":"Mac 上切换 node.js 版本","description":"","frontmatter":{},"headers":[],"relativePath":"articles/04-其他/Mac相关/Mac上切换node.js版本.md","filePath":"articles/04-其他/Mac相关/Mac上切换node.js版本.md"}'),o={name:"articles/04-其他/Mac相关/Mac上切换node.js版本.md"},c=p("",15),u=s("li",null,"nvm list 查看已经安装的版本",-1),k=s("li",null,"nvm list installed 查看已经安装的版本",-1),b=s("li",null,"nvm list available 查看网络可以安装的版本",-1),m=s("li",null,"nvm version 查看当前的版本",-1),v=s("li",null,"nvm install 安装最新版本nvm",-1),g=s("li",null,"nvm ls 列出所有版本",-1),F=s("li",null,"nvm current显示当前版本",-1),_=s("li",null,"nvm on 打开nodejs控制",-1),C=s("li",null,"nvm off 关闭nodejs控制",-1),y=s("li",null,"nvm proxy 查看设置与代理",-1),B=s("li",null,[a("nvm node_mirror [url] 设置或者查看setting.txt中的node_mirror，如果不设置的默认是 "),s("a",{href:"https://links.jianshu.com/go?to=https%3A%2F%2Fnodejs.org%2Fdist%2F",target:"_blank",rel:"noreferrer"},"https://nodejs.org/dist/")],-1),f=s("li",null,[a("nvm npm_mirror [url] 设置或者查看setting.txt中的npm_mirror,如果不设置的话默认的是： "),s("a",{href:"https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fnpm%2Fnpm%2Farchive%2F",target:"_blank",rel:"noreferrer"},"https://github.com/npm/npm/archive/"),a(".")],-1),E=s("li",null,"nvm use [version] [arch] 切换制定的node版本和位数",-1),w=s("li",null,"nvm root [path] 设置和查看root路径",-1),j=s("li",null,"注：nvm 只能查看和切换 通过nvm 安装的 node 环境，通过其他方式安装的node 不能查看",-1),q=p("",20);function x(P,T,M,N,A,S){const n=t("version"),l=t("name");return r(),d("div",null,[c,s("ul",null,[u,k,b,m,v,s("li",null,[a("nvm use "),i(n,null,{default:e(()=>[a("## 切换使用指定的版本node")]),_:1})]),g,F,s("li",null,[a("nvm alias "),i(l,null,{default:e(()=>[i(n,null,{default:e(()=>[a("## 给不同的版本号添加别名")]),_:1})]),_:1})]),s("li",null,[a("nvm unalias "),i(l,null,{default:e(()=>[a("## 删除已定义的别名")]),_:1})]),s("li",null,[a("nvm reinstall-packages "),i(n,null,{default:e(()=>[a("## 在当前版本node环境下，重新全局安装指定版本号的npm包")]),_:1})]),_,C,y,B,f,s("li",null,[a("nvm uninstall "),i(n,null,{default:e(()=>[a("卸载制定的版本")]),_:1})]),E,w,j]),q])}const $=h(o,[["render",x]]);export{I as __pageData,$ as default};
