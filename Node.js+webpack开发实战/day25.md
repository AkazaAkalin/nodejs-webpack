# 服务端渲染
使用Vue/React/Angular 开发的单页应用都是用过JavaScript在浏览器中渲染出来的,这种方式有两个明显的缺点

+ 大部分搜索引擎无法收录我们的网页 因为页面是有JavaScript异步渲染的
+  在性能较差的移动设备上,首次加载的速度比较慢,影响体验

React 提出了虚拟DOM 让React与渲染层分离，对于服务端来说，只需要将虚拟DOM 渲染为HTML字符串即可

同构应用的核心目的是： 使同一份代码分别编译为浏览器和服务器环境下的代码。服务器端使用node.js因此有以下几点注意事项： 

+ 不能使用浏览器提供API 比如对DOM的操作
+ 不能使用第三方node_modules模块打包，而需要使用commonjs来require函数

## SSR 同构渲染

### SSR原理
1. 使用 react-dom提供的renderToString函数将React应用导出为一个node.js模块,该模块导出为一个函数
2. 使用express 开启HTTP服务接受请求，在响应中的第一不得函数值渲染输出到客户端

### 步骤
1. 添加SSR下的应用入口文件
2. 添加SSR环境下打包使用的Webpack配置文件
3. 使用http服务器承载http请求以输出html

### 以react项目为例
1. 添加SSR的webpack打包配置
   webpack.ssr.config.js
   在配置文件中配置打包SSR项
2. 添加src下main.ssr.tsx 相对于main.tsx
   ```
   import React from 'react'
   import {renderToString} from 'react-dom/server'
   import App from './App'
   export default function () {
       return renderToString(<App/ >)
   }
   ```
3. 添加SSR打包指令 package.json
   ```
   "build-ssr": "webpack --config webpack.ssr.config.js"
   ```
4. 执行指令打包
5. 添加Node.js HTTP服务器
   使用express来开启服务, 引入打包后的ssr文件
   ```
   <div id='app'>${render()}</div>
   ```
6. 启动应用， 在HTTP服务端渲染的SSR
7. 项目的目录结构
   ```
   {
       build: {
           bundle.js
           ssr.bundle.js
           index.html
       },
       src: {
           App.tsx,
           main.tsx,
           main.sst.tsx
       },
       index.html,
       package.json
       ssr.js
       node_modules
       webpack.config.js
       webpack.ssr.config.js
       tsconfig.json
   }
   ```