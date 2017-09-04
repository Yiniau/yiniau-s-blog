---
title: '[翻译]E10S-Multi, WebExtension APIs, CSS clip-path.md'
date: 2017-06-20 18:28:33
categories:
tags:
---

# [翻译]E10S-Multi, WebExtension APIS, CSS clip-path

翻译自 [mozilla  hacks](https://hacks.mozilla.org/2017/06/firefox-54-e10s-webextension-apis-css-clip-path/?utm_source=dev-newsletter&utm_medium=email&utm_campaign=jun15-2017)

---

### “E10S-Multi:” A new multi-process model for Firefox

今天的发布完成了Firefox向多进程浏览器的转变，除了UI进程之外，还运行了许多同步的内容进程，在Windows上有一个特殊的GPU进程。这样的设计会更容易激发现代处理器上可用的核心，并且使浏览器沙箱更加安全。它还提升了稳定性，一个页面进程的崩溃不回影响全部的tabs或者浏览器的其余部分。

> Today’s release completes Firefox’s transformation into a fully multi-process browser, running many simultaneous content processes in addition to a UI process and, on Windows, a special GPU process. This design makes it easier to utilize all of the cores available on modern processors and, in the future, to securely sandbox web content. It also improves stability, ensuring that a single content process crashing won’t take out all of your other tabs, nor the rest of the browser.

![multi-process](https://hacks.mozilla.org/files/2017/06/e10s-multi.png)

初始的多进程Firefox（代号为 “Electrolysis” 简写为 “e10s”）首次亮相于Firefox 48。第一版将Firefox的UI移入了一个独立的进程，这样的话浏览器界面即使是在页面加载的时候也很快。Firefox 54通过并行运行许多内容进程来进一步实现这一点：每个进程都具有由主机操作系统管理的自己的RAM和CPU资源。

> An initial version of multi-process Firefox (codenamed “Electrolysis”, or “e10s” for short) debuted with Firefox 48 last August. This first version moved Firefox’s UI into its own process so that the browser interface remains snappy even under load. Firefox 54 takes this further by running many content processes in parallel: each one with its own RAM and CPU resources managed by the host operating system.

无论优化程度如何，额外的进程确实带来了较少的内存开销，但是我们已经尝试将其减少到最低限度。即使有了这些优化，我们还想做更多的工作，以确保Firefox对您的RAM友好。这就是为什么不是每个选项卡产生一个新的进程，Firefox设置了一个上限：默认为四个，但可由用户配置（dom.ipc.processCount in about：config）。这在让Firefox在使用更强的多核CPUs的同时保证了你的控制权

> Additional processes do come with a small degree of memory overhead, no matter how well optimized, but we’ve worked wonders to reduce this to the bare minimum. Even with those optimizations, we wanted to do more to ensure that Firefox is respectful of your RAM. That’s why, instead of spawning a new process with every tab, Firefox sets an upper limit: four by default, but configurable by users (dom.ipc.processCount in about:config). This keeps you in control, while still letting Firefox take full advantage of multi-core CPUs.

了解更多有关Firefox的多进程体系结构，查看[Medium post about the search for the “Goldilocks” browser.](https://medium.com/mozilla-tech/the-search-for-the-goldilocks-browser-and-why-firefox-may-be-just-right-for-you-1f520506aa35)

> To learn more about Firefox’s multi-process architecture, check out this Medium post about the search for the “Goldilocks” browser.

### new WebExtension APIs

Firefox继续快速实施新的WebExtension API。这些API旨在跨浏览器工作，并且将是Firefox 57今年11月推出的唯一可用于附加组件的API。

> Firefox continues its rapid implementation of new WebExtension APIs. These APIs are designed to work cross-browser, and will be the only APIs available to add-ons when Firefox 57 launches this November.

最值得注意的是，现在可以使用WebExtensions创建自定义DevTools面板。例如，下面的屏幕截图显示了在Firefox中运行的Vue.js DevTools的Chrome版本，无需任何修改。这大大降低了devtools附加组件作者的维护负担，确保无论您喜欢哪种框架，其工具都可以在Firefox中运行。  

![vue.js devtools](https://hacks.mozilla.org/files/2017/06/Screen-Shot-2017-06-12-at-19.14.30.png)

> Most notably, it’s now possible to create custom DevTools panels using WebExtensions. For example, the screenshot below shows the Chrome version of the Vue.js DevTools running in Firefox without any modifications. This dramatically reduces the maintenance burden for authors of devtools add-ons, ensuring that no matter which framework you prefer, its tools will work in Firefox.

另外：
  - [侧边栏](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/sidebar_action)可以通过sidebar_action清单属性创建。与其他API一起，侧边栏可用于实现[垂直](https://addons.mozilla.org/en-US/firefox/addon/sidebar-tabs-webextension/)或[树形](https://addons.mozilla.org/firefox/addon/tree-tabs/)样式选项卡等。
  - WebExtensions 现在能够[替换或自定义标签页](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/chrome_url_overrides)([exmaple](https://github.com/mdn/webextensions-examples/tree/master/top-sites))
  - WebExtensions也可以注册对[自定义协议](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/protocol_handlers)的支持。例如，加载项可以将`irc：//`链接重定向到IRCCloud。

请阅读附加组件博客上全套[新增和更改的API](https://blog.mozilla.org/addons/2017/03/13/webextensions-firefox-54/)，或查看MDN上的完整WebExtensions文档。

> Additionally:
  - Sidebars can be created via a sidebar_action manifest property. Together with other APIs, sidebars can be used to implement vertical or tree-style tabs, among other things.
  - WebExtensions can now replace or customize the New Tab page. (Example).
  - WebExtensions can also register support for custom protocols. For example, an add-on could redirect irc:// links to IRCCloud.

> Read about the full set of new and changed APIs on the Add-ons Blog, or check out the complete WebExtensions documentation on MDN.

# CSS shapes in clip-path

CSS clip-path(剪辑路径)属性允许作者定义元素的哪些部分是可见的。以前，Firefox只支持定义为SVG文件的剪切路径。使用Firefox 54，作者还可以使用 [CSS shape functions](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape) (形状函数)进行圆，椭圆，矩形或任意多边形（[Demo](https://codepen.io/ladybenko/pen/oWJBwW)）。

> The CSS clip-path property allows authors to define which parts of an element are visible. Previously, Firefox only supported clipping paths defined as SVG files. With Firefox 54, authors can also use CSS shape functions for circles, ellipses, rectangles or arbitrary polygons (Demo).

想许多CSS值一样，剪切形状可以动画化。有一些规则控制[如何执行值之间的插值](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape#Interpolation_of_basic_shapes)，长话短说，当你在相同的形状或者具有相同数量顶点的多边形内进行插值，则一切都好。

**exmaple**
```html
<img src="https://hacks.mozilla.org/files/2017/06/firefox-logo.png" height="200" class="circle">
```

```css
.circle {
  animation: 2s infinite alternate circle;
}

@keyframes circle {
  from {
    -webkit-clip-path: circle(0%);
    clip-path: circle(0%);
  }
  to {
    -webkit-clip-path: circle(120px);
    clip-path: circle(120px);
  }
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  box-sizing: border-box;
}

body > * {
  display: block;
  flex: 0 0 auto;
}
```

[剪切动画的demo on codepen](https://codepen.io/ladybenko/pen/NjoKVy)

> Like many CSS values, clipping shapes can be animated. There are some rules that control how the interpolation between values is performed, but long story short: as long as you are interpolating between the same shapes, or polygons with the same number of vertices, you should be fine. Here’s how to animate a circular clipping:

您还可以根据用户输入动态更改裁剪，如本示例中具有鼠标控制的[“潜望镜”效果的示例](https://codepen.io/ladybenko/pen/qmvKrM)

```javascript
let container = document.querySelector('.frame');
const RADIUS = 80;

document.addEventListener('mousemove', function (event) {
  let x = event.clientX;
  let y = event.clientY;

  let circle = `circle(${RADIUS}px at ${x}px ${y}px)`;
  container.style['-webkit-clip-path'] = circle;
  container.style['clip-path'] = circle;
});
```

```html
<article class="frame">
</article>

<p class="message">Move the mouse around…</p>
```

```css
body {
  background: #000;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
}

.frame {
  background-image: url(https://hacks.mozilla.org/files/2017/06/benko-game.png);
  background-repeat: repeat-x;
  background-position: left center;
  width: 100%;
  height: 100%;

  -webkit-clip-path: circle(80px);
  clip-path: circle(80px);
}

.message {
  position: absolute;
  color: #fff;
  top: 20px;
  left: 20px;
  font-family: monospace;
  font-size: 1.2em;
  background: #0006;
  padding: 1em;
}
```

> You can also dynamically change clipping according user input, like in this example that features a “periscope” effect controlled by the mouse:

了解更多，查看我们[上周的 clip-path 文章](https://hacks.mozilla.org/2017/06/css-shapes-clipping-and-masking/)。

> To learn more, check our article on clip-path from last week.

# Project Dawn

最后，Firefox 54的发布标志着[项目“Dawn”](http://release.mozilla.org/firefox/release/2017/05/30/Dawn-update.html)转换的完成，消除了Firefox的预测版发布渠道，代号为“Aurora”。Firefox发行版现在每六个星期直接从Nightly转为Beta版。基于Aurora的Firefox Developer Edition现在基于Beta。

> Lastly, the release of Firefox 54 marks the completion of the Project Dawn transition, eliminating Firefox’s pre-beta release channel, codenamed “Aurora.” Firefox releases now move directly from Nightly into Beta every six weeks. Firefox Developer Edition, which was based on Aurora, is now based on Beta.

对于早期采用者，我们还在Google Play上提供了适用于Android的[Firefox Nightly](https://play.google.com/store/apps/details?id=org.mozilla.fennec_aurora)。

> For early adopters, we’ve also made Firefox Nightly for Android available on Google Play.
