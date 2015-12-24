title: GettingStarted
order: 1
---

## Installation

首先将源码下下来
`git clone git@github.com:Littly/haloDoc.git haloDoc`

**安装依赖**
```bash
cd haloDoc
npm install
```


## Usage
**新建文章**
`hexo new doc {{ title }}`

**生成静态文件**
`hexo g`

**开启服务**
`hexo s`

打开**[http://0.0.0.0:4000](http://0.0.0.0:4000)**看效果


## TAGS

### 警示框

**{% raw %}{% alert error %}{% endraw %}**
这是警示框
**{% raw %}{% endalert %}{% endraw %}**

### 提示框
**{% raw %}{% alert warn %}{% endraw %}**
这是提示框 
**{% raw %}{% endalert %}{% endraw %}**


### 信息框
**{% raw %}{% alert info %}{% endraw %}**
这是信息框
**{% raw %}{% endalert %}{% endraw %}**

### CodePen
**{% raw %}{% codepen {{ id }} [height=250] %}{% endraw %}**


## Demo

{% alert error %}
这是警示框
{% endalert %}

{% alert warn %}
这是提示框 
{% endalert %}

{% alert info %}
这是信息框
{% endalert %}

### 代码Demo

{% codepen KVggpQ 250 %}