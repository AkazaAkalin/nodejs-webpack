# Koa 框架
## bluebird
```
bluebird.promisifyAll(target, options)
```
target： 需要包装的对象 
+ 如果target是普通对象 则生成的API只有该对象持有
+ 如果是原型对象，则API被所有实例持有
  
options： 

+ suffix 后缀名 默认为Async 
+ multiArg 是否允许多个回调参数
  
## 快速开始一个Koa                  
```
const Koa = require('koa')

const app = new Koa()

app.use(async (ctx)=> {
    ctx.body = 'helloWorld'
})
app.listen(10000, () => {
    console.log('listen on 10000')
})
```
## context
context  实例中有以下几个常用方法
+ ctx.request Koa的请求对象，一般不直接使用 通过别名引用来访问
+ ctx.response Koa的响应对象，一般不直接使用 通过别名引用来访问                
+ *ctx.state: ctx.state中，后续中间件可以读取
+ *ctx.throw() 抛出http异常
+ ctx.headers 报头  ctx.request.headers别名
+ ctx.method 请求方法 ctx.request.method别名
+ ctx.url
+ ctx.path
+ ctx.query
+ ctx.host
+ ctx.ip
+ ctx.ips
+ ctx.get()
+ ctx.bofy
+ ctx.type
+ ctx.set()
  
## 读取cookie
```
ctx.cookies.set('logged', 1, {
        sign: true, 
        httppOnly: true,
        maxAge: 3600 * 24 * 1000 
    })
ctx.body = {
    cookies: ctx.cookies.get('logged', {signed: true})
}
```
## 中间件
+ Koa的中间件也能访问请求对象，响应对象和next()函数
    + 执行逻辑代码
    + 更改请求和响应
    + 结束请求和响应的周期
    + 调用下一个中间件
    + 处理错误

```
async function middleware(ctx, next)
```
执行之后的代码需要将数据传递到ctx.state 并调用await next() 才能将请求交给下一个中间件处理
### 中间件的规则成为‘洋葱圈模型’
最先use的在最外层 最后use的在内层
由外层执行到内层的响应部分，再由响应部分向外层执行
```
async function middleware1(ctx, next) {
    console.log('middleware1 start')
    next()
    console.log('middleware1 end')
}

async function middleware2(ctx, next) {
    console.log('middleware2 start')
    next()
    console.log('middleware2 end')
}
app.use(middleware1)
app.use(middleware2)
app.use(async (ctx)=> {
    console.log('router')
    ctx.body = 'helloworld'
})
```
```
middleware1 start
middleware2 start
router
middleware2 end
middleware1 end
```
****

## 请求日志中间件
```
async function logger(ctx, next) {
    const start = Date.now()
    await next()
    console.log(`${ctx.method},${ctx.path},${ctx.headers['user-agent']}`, `${Date.now()-start}ms`)
}
app.use(logger)
```

## 可配置的中间件
```
function logger(options) {
    return   function(ctx, next) {
        let parts = []
        const start = Date.now()
         next()
        options.method && parts.push(ctx.method)
        options.path && parts.push(ctx.path)
        options.userAgent && parts.push(ctx.headers['user-agent'])
        console.log(parts, `${Date.now()-start}ms`)
    }
}
```

## cookie 
```
async function cookieParser(ctx, next) {
    const headerCookie = ctx.headers.cookie
    ctx.state.cookies = {}
    if(headerCookie) {
        const cookies = headerCookie.split(',')
        cookies.forEach(item => {
            item.split('=')
            ctx.state.cookies[item[0]] = item[1]
        })
    }
    await next()
}
app.use(cookieParser)
```
## 路由
## 错误处理
```
async function errorHandler(ctx, next) {
    try{
        await next()
    } catch(e) {
        ctx.state = e.state || 500
        ctx.body = e.message || 'error'
    }
}
```
### 多个异常处理的顺序

```
async function errorlogger(ctx, next) {
    try{
        await next()
    } catch(e) {
        console.log('logger', e.message)
        throw e
    }
}
```