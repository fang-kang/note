import{_ as s,a,o as i,aR as e}from"./chunks/framework.kUD5hkPg.js";const t="/note/assets/1.B2SZpuht.png",F=JSON.parse('{"title":"git 规范","description":"","frontmatter":{},"headers":[],"relativePath":"articles/04-其他/Git/03-git规范.md","filePath":"articles/04-其他/Git/03-git规范.md"}'),n={name:"articles/04-其他/Git/03-git规范.md"},l=e(`<h1 id="git-规范" tabindex="-1">git 规范 <a class="header-anchor" href="#git-规范" aria-label="Permalink to &quot;git 规范&quot;">​</a></h1><p>git 规范包括两点：分支管理规范、git commit 规范。</p><h2 id="_1-分支管理规范" tabindex="-1">1.分支管理规范 <a class="header-anchor" href="#_1-分支管理规范" aria-label="Permalink to &quot;1.分支管理规范&quot;">​</a></h2><ul><li><code>master</code> 用于保存上线的代码</li><li><code>develop</code> 用于保存相对稳定代码，所有的<code>feature</code>分支都是通过该分支创建</li><li><code>feature</code> 用于开发新的功能分支， 不同的功能应创建不同的功能分支</li><li><code>release</code> 用于代码上线前准备（测试、文档完善、bug修复）该分支基于<code>develop</code>分支创建 ---- 完善后直接提交至<code>master</code></li><li><code>bugfix</code> 用于修复不紧急的<code>bug</code> 一般基于<code>release</code>创建，测试过程中出现的<code>bug</code></li><li><code>hotfix</code> 用于需要紧急修复的bug 一般基于<code>master</code>创建，线上<code>bug</code>需要立即修复</li></ul><h2 id="_2-git-commit-规范" tabindex="-1">2.git commit 规范 <a class="header-anchor" href="#_2-git-commit-规范" aria-label="Permalink to &quot;2.git commit 规范&quot;">​</a></h2><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">type</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&gt;(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">scope</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">)</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">subject</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">BLANK LINE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">body</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">BLANK LINE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">footer</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="header" tabindex="-1">Header <a class="header-anchor" href="#header" aria-label="Permalink to &quot;Header&quot;">​</a></h3><h4 id="type-必填" tabindex="-1">type（必填） <a class="header-anchor" href="#type-必填" aria-label="Permalink to &quot;type（必填）&quot;">​</a></h4><div class="language-zsh vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">zsh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 主要 type</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">feat:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     增加新功能</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fix:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      修复</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bug</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 特殊type</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docs:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     只改动了文档相关的内容</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">style:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">build:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    构造工具的或者外部依赖的改动，例如</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> webpack，npm</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">refactor:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 代码重构时使用</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">revert:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   执行</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> revert</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 打印的</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> message</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 暂不使用type</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">test</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:     </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">添加测试或者修改现有测试</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">perf:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     提高性能的改动</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ci:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">       与</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> CI（持续集成服务）有关的改动</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">chore:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    不修改</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> src</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 或者</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 的其余修改，例如构建过程或辅助工具的变动</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h4 id="scope-非必填" tabindex="-1">scope（非必填） <a class="header-anchor" href="#scope-非必填" aria-label="Permalink to &quot;scope（非必填）&quot;">​</a></h4><p><code>scope</code> 用于说明 <code>commit</code> 影响的范围，比如数据层、控制层、视图层等等，视实际使用情况而定</p><h4 id="subject-必填" tabindex="-1">subject（必填） <a class="header-anchor" href="#subject-必填" aria-label="Permalink to &quot;subject（必填）&quot;">​</a></h4><p><code>subject</code> 用于说明 <code>commit</code> 目的的简短描述，不超过50个字符</p><h3 id="body" tabindex="-1">Body <a class="header-anchor" href="#body" aria-label="Permalink to &quot;Body&quot;">​</a></h3><p><code>body</code> 用于说明 <code>commit</code> 的详细描述，内容可以分成多行，主要描述改动之前的情况及修改动机，对于小的修改不作要求，但是重大需求、更新等尽量添加 body 来作说明</p><h3 id="footer" tabindex="-1">Footer <a class="header-anchor" href="#footer" aria-label="Permalink to &quot;Footer&quot;">​</a></h3><h4 id="break-changes" tabindex="-1">break changes <a class="header-anchor" href="#break-changes" aria-label="Permalink to &quot;break changes&quot;">​</a></h4><p><code>break changes</code> 用于说明是否产生了破坏性修改(不兼容变动)，涉及 <code>break changes</code> 的改动必须指明该项，类似版本升级、接口参数减少、接口删除、迁移等。</p><h4 id="affect-issues" tabindex="-1">affect issues <a class="header-anchor" href="#affect-issues" aria-label="Permalink to &quot;affect issues&quot;">​</a></h4><p><code>affect issues</code> 用于说明是否影响了某个<code>issue</code></p><h3 id="commit-前缀" tabindex="-1">commit 前缀 <a class="header-anchor" href="#commit-前缀" aria-label="Permalink to &quot;commit 前缀&quot;">​</a></h3><p>目前主流的前缀包括以下部分：</p><ul><li>build：表示构建，发布版本可用这个</li><li>ci：更新 CI/CD 等自动化配置</li><li>chore：杂项，其他更改</li><li>docs：更新文档</li><li>feat：常用，表示新增功能</li><li>fix：常用：表示修复 bug</li><li>perf：性能优化</li><li>refactor：重构</li><li>revert：代码回滚</li><li>style：样式更改</li><li>test：单元测试更改</li></ul><p>示例:</p><h3 id="fix-修复-bug" tabindex="-1">fix（修复 BUG） <a class="header-anchor" href="#fix-修复-bug" aria-label="Permalink to &quot;fix（修复 BUG）&quot;">​</a></h3><p>如果修复的这个 BUG 只影响当前修改的文件，可不加范围。如果影响的范围比较大，要加上范围描述。</p><p>例如这次 BUG 修复影响到全局，可以加个 global。如果影响的是某个目录或某个功能，可以加上该目录的路径，或者对应的功能名称。</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 示例1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fix(global</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">):修复checkbox不能复选的问题</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 示例2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 下面圆括号里的</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> common</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 为通用管理的名称</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fix(common</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">): 修复字体过小的BUG，将通用管理下所有页面的默认字体大小修改为 14px</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">//</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 示例3</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fix:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> value.length</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> -</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> values.length</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="feat-添加新功能或新页面" tabindex="-1">feat（添加新功能或新页面） <a class="header-anchor" href="#feat-添加新功能或新页面" aria-label="Permalink to &quot;feat（添加新功能或新页面）&quot;">​</a></h3><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">feat:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 添加网站主页静态页面</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">这是一个示例，假设对点检任务静态页面进行了一些描述。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">这里是备注，可以是放BUG链接或者一些重要性的东西。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="chore-其他修改" tabindex="-1">chore（其他修改） <a class="header-anchor" href="#chore-其他修改" aria-label="Permalink to &quot;chore（其他修改）&quot;">​</a></h3><p>chore 的中文翻译为日常事务、例行工作，顾名思义，即不在其他 commit 类型中的修改，都可以用 chore 表示。</p><div class="language-bash vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">chore:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 将表格中的查看详情改为详情</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>其他类型的 commit 和上面三个示例差不多，就不说了。</p><h3 id="vscode-插件" tabindex="-1">Vscode 插件 <a class="header-anchor" href="#vscode-插件" aria-label="Permalink to &quot;Vscode 插件&quot;">​</a></h3><p>可以使用<code>git-commit-plugin</code>这个插件</p><p><img src="`+t+'" alt="img" data-fancybox="gallery"></p><h2 id="_3-git-hooks" tabindex="-1">3.Git hooks <a class="header-anchor" href="#_3-git-hooks" aria-label="Permalink to &quot;3.Git hooks&quot;">​</a></h2><table><thead><tr><th style="text-align:center;"><strong>pre-commit</strong></th><th style="text-align:center;"><code>git commit</code>执行前</th><th style="text-align:center;">可以通过<code>git commit --no-verify</code>绕过</th></tr></thead><tbody><tr><td style="text-align:center;"><strong>commit-msg</strong></td><td style="text-align:center;"><code>git commit</code>执行前</td><td style="text-align:center;">可以用<code>git commit --no-verify</code>绕过</td></tr><tr><td style="text-align:center;">post-commit</td><td style="text-align:center;"><code>git commit</code>执行后</td><td style="text-align:center;">不影响<code>git commit</code>的结果</td></tr><tr><td style="text-align:center;">pre-merge-commit</td><td style="text-align:center;"><code>git merge</code>执行前</td><td style="text-align:center;">可以用<code>git merge --no-verify</code>绕过。</td></tr><tr><td style="text-align:center;">prepare-commit-msg</td><td style="text-align:center;"><code>git commit</code>执行后，编辑器打开之前</td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;">pre-rebase</td><td style="text-align:center;"><code>git rebase</code>执行前</td><td style="text-align:center;"></td></tr><tr><td style="text-align:center;">post-checkout</td><td style="text-align:center;"><code>git checkout</code>或<code>git switch</code>执行后</td><td style="text-align:center;">如果不使用<code>--no-checkout</code>参数，则在<code>git clone</code>之后也会执行。</td></tr><tr><td style="text-align:center;">post-merge</td><td style="text-align:center;"><code>git commit</code>执行后</td><td style="text-align:center;">在执行<code>git pull</code>时也会被调用</td></tr><tr><td style="text-align:center;">pre-push</td><td style="text-align:center;"><code>git push</code>执行前</td><td style="text-align:center;"></td></tr></tbody></table>',39),h=[l];function p(r,d,c,o,k,g){return i(),a("div",null,h)}const m=s(n,[["render",p]]);export{F as __pageData,m as default};
