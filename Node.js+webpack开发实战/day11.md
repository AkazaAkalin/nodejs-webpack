# router
```
const Router = require('koa-router')
const router = new Router()
router.get('/', async (ctx, next)=> {
    ctx.body = 'hello'
})
router.get('/user', async (ctx) => {
    ctx.body = 'user'
})
app.use(router.routes())
```
# 路由对象

```
funtion Router([options])
```
options 
+ prefix 路由前缀

实例化
router.method(path, handler)
+ method get post...
+ path / /user...
+ handler 支持多个处理函数

```
router.get('/', ()=> {})
router.get('/1.txt', ()=> {})
router.get('/user/:userid', (ctx)=> {
    ctx.body = ctx.params.userid
})
router.get('/', async (ctx, next())=> {
    ctx.state.data = {
        logged: true
    }
    await next()
}, (ctx)=> {
    ctx.body = ctx.state.data
})
```

# 路由中间件
```
async function loggerMiddleware(ctx, next) {
    console.log(`${ctx.method}, ${ctx.path}, ${ctx.headers}`)
    await next()
}
app.use(loggerMiddleware) // 全局路由使用日志中间件

app.get('/user', loggerMiddleware, ()=> {
    //...
}) ///user路由下使用 日志中间件
```
# 路由前缀
路由前缀将同一个模块聚合在一起
```
const router = new Router({prefix: '/user'})
app.get('/', ()=>{}) // /user/  的路由
app.get('/list', ()=> {}) // /user/list 路由

```

# 模块化路由
 * koa.js
   + routes
      - site.js
      - user.js

```
site.js

const Router = require('koa-router')

const router = new Router()
router.get('/',(ctx) => {
    ctx.body = 'index'
})
router.get('/help', (ctx) => {
    ctx.body = 'help'
})
module.exports = {
    router
}
```
```
user.js
const Router = require('koa-router')

const router = new Router({prefix: '/user'})
router.get('/', (ctx)=>{
    ctx.body = '/user'
}) 
router.get('/list', (ctx)=> {
    ctx.body = '/user/list'
}) 
module.exports = {
    router
}
```
```
koa.js
const site = require('./routes/site').router
const user = require('./routes/user').router
app.use(site.routes())
app.use(user.routes())
```