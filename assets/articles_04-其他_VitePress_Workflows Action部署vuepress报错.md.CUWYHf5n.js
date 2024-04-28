import{_ as s,a as i,o as a,aR as e}from"./chunks/framework.kUD5hkPg.js";const t="/note/assets/1.C1i5_90I.png",u=JSON.parse('{"title":"关于 Workflows Action 部署 vuepress 报错","description":"","frontmatter":{},"headers":[],"relativePath":"articles/04-其他/VitePress/Workflows Action部署vuepress报错.md","filePath":"articles/04-其他/VitePress/Workflows Action部署vuepress报错.md"}'),n={name:"articles/04-其他/VitePress/Workflows Action部署vuepress报错.md"},r=e(`<h1 id="关于-workflows-action-部署-vuepress-报错" tabindex="-1">关于 Workflows Action 部署 vuepress 报错 <a class="header-anchor" href="#关于-workflows-action-部署-vuepress-报错" aria-label="Permalink to &quot;关于 Workflows Action 部署 vuepress 报错&quot;">​</a></h1><h2 id="_1-项目场景" tabindex="-1">1.项目场景 <a class="header-anchor" href="#_1-项目场景" aria-label="Permalink to &quot;1.项目场景&quot;">​</a></h2><p>笔记(vitepress)部署采用自动部署文档的 Github 工作流。</p><h2 id="_2-报错信息" tabindex="-1">2.报错信息 <a class="header-anchor" href="#_2-报错信息" aria-label="Permalink to &quot;2.报错信息&quot;">​</a></h2><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Error:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> The</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> deploy</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> step</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> encountered</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> an</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> error:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> The</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> process</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;/usr/bin/git&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> failed</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> with</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> exit</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> code</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 128</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ❌</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Notice:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Deployment</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> failed!</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ❌</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="_3-原因分析" tabindex="-1">3.原因分析 <a class="header-anchor" href="#_3-原因分析" aria-label="Permalink to &quot;3.原因分析&quot;">​</a></h2><p>默认情况下，新存储库没有适当的工作流权限。</p><h2 id="_4-解决方案" tabindex="-1">4.解决方案 <a class="header-anchor" href="#_4-解决方案" aria-label="Permalink to &quot;4.解决方案&quot;">​</a></h2><p>转到存储库 Setting</p><p>选择 Actions&gt;&gt;&gt;General</p><p>在&quot;工作流权限(Workflow permissions)&quot;中，选择 Read and write permissions</p><p><img src="`+t+'" alt="" data-fancybox="gallery"></p>',12),l=[r];function h(p,o,k,d,c,F){return a(),i("div",null,l)}const g=s(n,[["render",h]]);export{u as __pageData,g as default};
