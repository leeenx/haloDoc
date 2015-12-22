title: GettingStarted
order: 1
---

## Installation

首先将源码下下来
`git clone git@github.com:Littly/haloDoc.git haloDoc`

安装依赖
```bash
cd haloDoc
npm install
```

## Usage
新建文章
`hexo new doc {{ title }}`

生成静态文件
`hexo g`

开启服务
`hexo s`

打开[http://0.0.0.0:4000](http://0.0.0.0:4000)看效果

## TAGS

警示块
{% error %}
需要注意的是，使用这个方法的第一个分页都应该独立在一个节点内，并且这个节点需要添加一个叫 page 的样式。因为 pageinvite 内部方法是通过 class="page" 来识别分页的。需要引入 uievent 作为事件依赖 
{% enderror %}

提示块
{% warn %}
touchdrag 是 pagedrag 的完全版本，能完全实现4向滚动。但是，现实意义不大，而且代码长度是 pagedrag 的3倍。
不过 touchdrag 可以不依赖 halo.js 而独立被引用。
视具体情况来使用 touchdrag，如果是双向滚动建议直接用 pagedrag，四向滚动可以考虑用 pagedrag 的嵌套形式实现四向滚动。
{% endwarn %}

信息框
{% info %}
* 因为 msgbox.show 支持多框并存，所以 msgbox.hide 需要指定是哪个窗口才可以正常关闭弹窗。不过，正常情况下，msgbox.hide 被调用的机会很少。因为 msgbox.show 的按钮自带有关闭功能。
{% endinfo %}