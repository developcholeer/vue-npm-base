<!--
 * @Descripttion:
 * @version:
 * @Author: cholee
 * @Date: 2020-08-25 17:21:05
 * @LastEditors: cholee
 * @LastEditTime: 2020-08-26 10:36:54
-->
# vue-npm-base
cholee彩虹里-基于vue的单页面应用工程模板，用于初始化项目
### 1.0 环境

- npm>4.0.0
- node>8.0.0

### 1.1 初始化工程

### 1.2 安装依赖

```
npm i
```

### 1.3 进入开发模式

```
npm run dev
```

### 1.4 打包

```
npm run build
```

### 1.5 项目目录

```
|- src	开发目录
 |- assets	资源目录
	|- img 	图片
 |- components	模块组件目录
 |- js	项目公共js文件
 |- libs	使用到的第三方库
 |- style	公共样式文件
 |- router	vue单页面工程中的路由文件
 |- store	vue单页面工程中的vuex文件
 |- index.html 页面入口
 |- index.js 入口js文件 在当前文件初始化vue
|- static	静态资源目录
```

### 1.8 配置文件

详见`build`目录下`webpack.cfg.js`

- 配置代理
- 配置输出目录
- 配置开发调试端口号
- 配置 px2rem 默认不开启
- 打包配置 cdn 路径 将打包后的 static 目录放置在对应的 cdn 节点即可
- 配置默认引用的 js 文件

## 2、功能简介

### 2.1 开发模式

- 不支持多页面，支持 vue，支持 scss，支持 ts
- 支持无需引入即可全局使用的`common_entry.js`
- `src/pages`中的 html（或 pug）文件和`src/pages`中的 js（入口）文件,在同一个文件夹中并且名称相同
- 新增页面，需要重新运行`npm run dev` html，css，js 更改自动刷新

### 2.2 关于图片资源

- 图片不要放在`/static`文件下，而是放在`/assets`。

  - 因为 html 中 img 标签的`src`如果是绝对路径则会被定为到`src`目录下，无法引用到`static`目录下
  - css 中图片如果以`/static`路径开头，会不经过`url-loader`所处理

- html 中的 img 标签`src`对应图片可以被`url-loader`所处理

  - 第一种方式是`相对html路径`
  - 第二种方式以`/assets`开头的绝对路径，自动定位到`src/assets`目录下
  - 第三种种方式以`~@/assets`开头的绝对路径，自动定位到`src/assets`目录下

- csss 中的背景图写法
  - 第一种方式是`相对css文件的相对路径`
  - 第二种种方式以`~@/assets`开头的绝对路径，自动定位到`src/assets`目录下

### 2.3 打包相关

- 为了 css 文件图片路径完美生成`相对路径`，会被打包成奇怪的图片路径`../../static/img/xxx.jpg`
- 静态文件目录`static`文件夹，打包会被拷贝到 dist 目录
- 支持打包文件版本 hash，提取`vendor.js` `common.js` `[page].js`文件，只对模块更改的 css，js 文件版本 hash 进行更改
  - `vendor.js`是指`/node_modules`文件夹中引用的第三方插件
  - `common.js`是指被多个页面引用超过 2 次并且，大小超过 20k 时，才会生成
  - `[page.js]`对应着每个页面独自的 js 文件
- 生成模式 css 文件单独提取
- 小于 8k 图片文件和字体文件自动转 base64 代码
- pages 多级目录支持（忽略下划线开头的文件和文件夹）
  - 当配置文件`webpack.cfg.js`中`build.assetsPublicPath === './'`，二级目录以上页面需要在页面中，增加`<base>`标签进行修正相对路径。如`src/pages/test/test-0.html`中的`<head>`中的`<base href="../" />`
  - 当配置文件`webpack.cfg.js`中`build.assetsPublicPath === '/'`, 则路径为绝对路径，无需修正路径
