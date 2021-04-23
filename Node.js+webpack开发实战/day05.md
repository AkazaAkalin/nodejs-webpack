# Node express

## 1. 安装
## 2. 运行 
{
    1. 引用后创建实例
    2. 设置路由
    3. 设置端口
}

## 路由

```
app.METHOD(PATH, Handler)
```
METHOD 是请求方法 get post  delete put option head patch
如果需要处理所有的请求方法 app.all()

## 路由路径
 
## 公共路由路径
app.route().get().post()

## 模块化路由
```
timeline.js
const express = require('express')
const router = express.Router()

router.get('/list', (req, resp) => {
    resp.send('listTimeLine')
})
module.exports = {
    router
}
```
```
app.js
const timeline = require('./timeline').router
app.use('/timeline', timeline)
```
结果会注册'GET/timeline/list'