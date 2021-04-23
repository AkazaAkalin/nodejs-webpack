// 中间休息了几天 
# 请求对象

## req 对象的属性字段
```
app.get('/user/:userid', (req, resp) => {
    resp.json({
        method: req.method,
        url: req.url,
        header: req.headers,
        hostname: req.hostname,
        ip: req.ip,
        query: req.query,
        path: req.path,
        cookies: req.cookies
    })
})
http://localhost:8080/user/1?name=guohua&test=1
输出
{"method":"GET","url":"/user/1?name=guohua&test=1","header":{"host":"localhost:8080","connection":"keep-alive","pragma":"no-cache","cache-control":"no-cache","sec-ch-ua":"\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"","sec-ch-ua-mobile":"?0","upgrade-insecure-requests":"1","user-agent":"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9","sec-fetch-site":"none","sec-fetch-mode":"navigate","sec-fetch-user":"?1","sec-fetch-dest":"document","accept-encoding":"gzip, deflate, br","accept-language":"zh-CN,zh;q=0.9","cookie":"_YMKJ_UUID_=85d0372e-24bd-4fc7-8a2d-886df2f549e3; UM_distinctid=175106e82fb2ad-06d331ee39c60a-383e5509-100200-175106e82fc698; CNZZDATA1279336054=1555315022-1602311572-%7C1602311572"},"hostname":"localhost","ip":"::1","query":{"name":"guohua","test":"1"},"path":"/user/1"}
```
### cookie不会在req中被解析出来
在express框架中默认不解析，如果要获取cookie,要通过cookie-parse中间件

### 中间件是可以访问请求对象，响应对象以及next()函数 
中间件的任务：
1. 执行任何代码
2. 更改请求和响应对象
3. 结束请求处理
4. 调用下一个中间件

## cookie-parser
```
npm install cookie-parser --save
```
```
const cookieParser = require('cookie-parser')
app.use(cookieParser())

```
输出：
```
"cookies":{"_YMKJ_UUID_":"85d0372e-24bd-4fc7-8a2d-886df2f549e3","UM_distinctid":"175106e82fb2ad-06d331ee39c60a-383e5509-100200-175106e82fc698","CNZZDATA1279336054":"1555315022-1602311572-|1602311572"}
```

****
## req 请求体
body要通过 body-parser 来解析
```
npm install body-parser --save
```
```
const bodyParser = require('body-parser')
app.use(bodyParser())
```

# 响应对象

## resp.status
响应码
```
resp.status(403).end()
```
## resp.set
设置响应报头
```
resp.set('content-Type', 'text/plain')
resp.end('HelloWorld')
```
## resp.download
下载文件
```
resp.download('./1.text', '1.text', err => {
    console.warn('downloadFail', err)
})
```
## resp.end
结束响应过程
```
resp.end([chunk], [, encoding], [,callback])
chunk 响应数据
encoding 编码
callback 回调函数
```
## resp.redirect 
重定向
```
resp.redirect([status, ] path)
// 301 重定向实例
resp.redirect(301, './user/login')
resp.redirect('https://www.baidu.com')
```
## resp.render
渲染html
```
resp.render(view[, locals], [,callback])
view 视图名称
locals 传递到视图的变量对象
callback 返回可能的错误和html字符串但不是自动发送html到客户端
app.get('/user/home', (req, resp) => {
    resp.render('user/home', {name: 'guohua'})
})
```
## resp.cookie
```
resp.cookie(name, value[, optoins])
```
****
1. name cookie 名称
2. value cookie 值
3. options
    * domain 域名
    * expiresGMT 到期时间
    * httpOnly 将cookie标记为只有http能够访问（客户端JS无法访问）
    * maxAge 毫秒为单位 
    * path
    * secure 标记为仅在https下发送
    * signed 是否对cookie签名
****
```
app.get('/', (req, resp)=> {
    resp
    .cookie('logged', 'true', {
        httpOnly: true
        maxAge: 24 * 3600 * 1000 
    })
    .end()
})
```
## resp.send

```
app.get('/', (req, resp) => {
    resp.send({name: 'guohua'})
})
app.get('/', (req, resp) => {
    resp.send(''helloworld'')
})
```