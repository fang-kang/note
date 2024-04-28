import{_ as i,a as s,o as a,aR as n}from"./chunks/framework.kUD5hkPg.js";const d=JSON.parse('{"title":"04.eclipse 中使用 Maven","description":"","frontmatter":{},"headers":[],"relativePath":"articles/02-后端/Java/07-Maven/04.eclipse中使用Maven.md","filePath":"articles/02-后端/Java/07-Maven/04.eclipse中使用Maven.md"}'),l={name:"articles/02-后端/Java/07-Maven/04.eclipse中使用Maven.md"},t=n(`<h1 id="_04-eclipse-中使用-maven" tabindex="-1">04.eclipse 中使用 Maven <a class="header-anchor" href="#_04-eclipse-中使用-maven" aria-label="Permalink to &quot;04.eclipse 中使用 Maven&quot;">​</a></h1><h2 id="_1-在-eclipse-中配置-maven" tabindex="-1">1.在 eclipse 中配置 Maven <a class="header-anchor" href="#_1-在-eclipse-中配置-maven" aria-label="Permalink to &quot;1.在 eclipse 中配置 Maven&quot;">​</a></h2><ul><li>Eclipse 中默认自带 Maven 插件，但是自带的 Maven 插件不能修改本地仓库，所 以通常我们不使用自带的 Maven，而是使用自己安装的，在 Eclipse 中配置 Maven 的 步骤如下：</li><li>点击 Eclipse 中的 Window→Preferences <img src="https://fang-kang.gitee.io/blog-img/maven/20210426100539433.png#id=fsuq0&amp;originHeight=362&amp;originWidth=319&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" data-fancybox="gallery"></li><li>点开 Maven 前面的箭头，选择 Installations，点击 Add… <img src="https://fang-kang.gitee.io/blog-img/maven/20210426100527570.png#id=m0CSi&amp;originHeight=729&amp;originWidth=876&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" data-fancybox="gallery"></li><li>点击 Directory…选择我们安装的 Maven 核心程序的根目录，然后点击 Finish <img src="https://fang-kang.gitee.io/blog-img/maven/20210426100516151.png#id=vogWd&amp;originHeight=621&amp;originWidth=741&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" data-fancybox="gallery"></li><li>勾上添加的 Maven 核心程序 <img src="https://fang-kang.gitee.io/blog-img/maven/2021042610050498.png#id=ucvHt&amp;originHeight=729&amp;originWidth=875&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" data-fancybox="gallery"></li><li>选择 Maven 下的 User Settings，在全局设置哪儿点击 Browse…选择 Maven 核心程序的配置文件 settings.xml，本地仓库会自动变为我们在 settings.xml 文件中设置的路径 <img src="https://fang-kang.gitee.io/blog-img/maven/20210426100448710.png#id=DHUJA&amp;originHeight=727&amp;originWidth=879&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" data-fancybox="gallery"></li></ul><h2 id="_2-使用-eclipse-创建-java-项目" tabindex="-1">2.使用 eclipse 创建 Java 项目 <a class="header-anchor" href="#_2-使用-eclipse-创建-java-项目" aria-label="Permalink to &quot;2.使用 eclipse 创建 Java 项目&quot;">​</a></h2><ul><li>点击 File→New→Maven Project，弹出如下窗口 <img src="https://fang-kang.gitee.io/blog-img/maven/20210426100435683.png#id=RvhO9&amp;originHeight=648&amp;originWidth=725&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" data-fancybox="gallery"></li><li>点击 Next，配置坐标（GAV）及打包方式，然后点击 Finish <img src="https://fang-kang.gitee.io/blog-img/maven/20210426100420837.png#id=pLxaJ&amp;originHeight=789&amp;originWidth=963&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" data-fancybox="gallery"></li><li>创建完工程之后发现默认的 JDK 的编译版本与电脑安装的不符合，在 Maven 的核心配置文 件 settings.xml 文件中添加以下配置将编译版本改为 1.8，重启 Eclipse 即可</li></ul><div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">profile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;jdk-1.8&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">id</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">activation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">activeByDefault</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;true&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">activeByDefault</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">jdk</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;1.8&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">jdk</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">activation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">properties</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">maven.compiler.source</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;1.8&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">maven.compiler.source</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">maven.compiler.target</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;1.8&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">maven.compiler.target</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">maven.compiler.compilerVersion</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;1.8&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">maven.compiler.compilerVersion</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">properties</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">profile</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><ul><li>配置 Maven 的核心配置文件 pom.xml 文件</li></ul><div class="language-xml vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">xml</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">project</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> xmlns</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;http://maven.apache.org/POM/4.0.0&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">xmlns:xsi</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">xsi:schemaLocation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;http://maven.apache.org/POM/4.0.0</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">https://maven.apache.org/xsd/maven-4.0.0.xsd&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">modelVersion</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;4.0.0&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">modelVersion</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;com.atguigu.maven&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Hello&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;0.0.1-SNAPSHOT&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependencies</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;junit&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">groupId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;junit&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">artifactId</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;4.12&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">scope</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;test&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">scope</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependency</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">dependencies</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">project</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><ul><li>编写主代码</li></ul><p>在 src/main/java 目录下创建包并创建 Hello.java 文件</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">package</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> com.cvzhanshi.maven;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Hello</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> public</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> String </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sayHello</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(String </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">){</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Hello &quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;!&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul><li>编写测试代码</li></ul><p>在 src/test/java 目录下创建包并创建 HelloTest.java 文件</p><div class="language-java vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">package</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> com.cvzhanshi.maven;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> org.junit.Test;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> static</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> junit.framework.Assert.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> HelloTest</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> @</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Test</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> public</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> testHello</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Hello hello </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Hello</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  String results </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> hello.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sayHello</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;litingwei&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  assertEquals</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Hello litingwei!&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,results);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><ul><li>使用 Maven 的方式运行 Maven 工程</li></ul><p>在工程名 Hello 或 pom.xml 上右键 →Run As 运行 Maven 项目</p><p><img src="https://fang-kang.gitee.io/blog-img/maven/20210426100402911.png#id=UJvek&amp;originHeight=830&amp;originWidth=999&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" data-fancybox="gallery"></p><h2 id="_3-使用-eclipse-创建-web-工程" tabindex="-1">3.使用 eclipse 创建 Web 工程 <a class="header-anchor" href="#_3-使用-eclipse-创建-web-工程" aria-label="Permalink to &quot;3.使用 eclipse 创建 Web 工程&quot;">​</a></h2><ul><li>创建简单的 Maven 工程，打包方式为 war 包 <img src="https://fang-kang.gitee.io/blog-img/maven/20210426100348160.png#id=RNHjp&amp;originHeight=881&amp;originWidth=980&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" data-fancybox="gallery"></li><li>创建完成之后因缺少 web.xml 文件工程出现小红叉 <img src="https://fang-kang.gitee.io/blog-img/maven/20210426100331188.png#id=Ign4N&amp;originHeight=578&amp;originWidth=686&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" data-fancybox="gallery"></li><li>在工程上右键 →Build Path→Configure Build Path… <img src="https://fang-kang.gitee.io/blog-img/maven/20210426100315866.png#id=t8g7n&amp;originHeight=719&amp;originWidth=994&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" data-fancybox="gallery"></li><li>点击 Project Facets 欺骗 Eclipse 当前工程不是 Web 工程，点击应用 <img src="https://fang-kang.gitee.io/blog-img/maven/20210426100250833.png#id=nH1n1&amp;originHeight=634&amp;originWidth=959&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" data-fancybox="gallery"></li><li>再告诉 Eclipse 当前工程是一个 Web 工程，点击应用并关闭 <img src="https://fang-kang.gitee.io/blog-img/maven/20210426100235983.png#id=td6nm&amp;originHeight=689&amp;originWidth=991&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" data-fancybox="gallery"></li><li>发现 MavenWeb 工程小红叉消失，并出现了 WebContext 目录 <img src="https://fang-kang.gitee.io/blog-img/maven/20210426100220665.png#id=dvYkS&amp;originHeight=749&amp;originWidth=683&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" data-fancybox="gallery"></li><li>在 WebContext 下创建 index.jsp 页面并添加 Tomcat 库 <img src="https://fang-kang.gitee.io/blog-img/maven/20210426100159921.png#id=gRWtk&amp;originHeight=815&amp;originWidth=687&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" data-fancybox="gallery"></li><li>在 MavenWeb 上右键 →Run As→Run on Server 部署到 Tomcat 上运行</li></ul><h2 id="_4-eclipse-中导入-maven-项目" tabindex="-1">4.Eclipse 中导入 Maven 项目 <a class="header-anchor" href="#_4-eclipse-中导入-maven-项目" aria-label="Permalink to &quot;4.Eclipse 中导入 Maven 项目&quot;">​</a></h2><ul><li>点击 File→Import… <img src="https://fang-kang.gitee.io/blog-img/maven/20210426101915643.png#id=AL80M&amp;originHeight=766&amp;originWidth=731&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" data-fancybox="gallery"></li><li>第一次导入手动创建的 Maven 项目时，由于项目中没有 Eclipse 生成的一些文件， 使用方式一导入时 Eclipse 认为它不是一个工程 <img src="https://fang-kang.gitee.io/blog-img/maven/20210426101906186.png#id=CpOUn&amp;originHeight=176&amp;originWidth=526&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" data-fancybox="gallery"></li></ul><p><img src="https://fang-kang.gitee.io/blog-img/maven/20210426101858506.png#id=FwMiO&amp;originHeight=832&amp;originWidth=725&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" data-fancybox="gallery"></p><ul><li>所以必须通过方式二导入到 Eclipse 中 <img src="https://fang-kang.gitee.io/blog-img/maven/20210426101836731.png#id=kjQtd&amp;originHeight=751&amp;originWidth=747&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" data-fancybox="gallery"></li></ul><p><img src="https://fang-kang.gitee.io/blog-img/maven/20210426101823513.png#id=woWnX&amp;originHeight=738&amp;originWidth=742&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" data-fancybox="gallery"></p><ul><li>导入到 Eclipse 中之后就会生成一些 Eclipse 能识别的文件 <img src="https://fang-kang.gitee.io/blog-img/maven/20210426101812518.png#id=PgfNR&amp;originHeight=257&amp;originWidth=516&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" data-fancybox="gallery"></li><li>有了这些 Eclipse 能识别的文件之后以后再往 Eclipse 中导入的时候选择方式一和 方式二都可以</li></ul>`,25),e=[t];function p(h,r,k,g,E,o){return a(),s("div",null,e)}const c=i(l,[["render",p]]);export{d as __pageData,c as default};
