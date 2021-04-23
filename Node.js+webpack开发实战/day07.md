# 中间件

## 全局中间件
```
function logger(req, resp, next) {
    console.log(`${req.method},${req.path},${req.headers['user-agent']}`)
    next()
}
app.use(logger)
app.get('/', (req, resp) => {
    resp.send('welcome+node')
})
app.get('/user/login', (req, resp) => {
    resp.send({name: 'guohua'})
})

```
GET,/,Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36

## 路由中间件
```
function logger(req, resp, next) {
    console.log(`${req.method},${req.path},${req.headers['user-agent']}`)
    next()
}
app.get('/', logger, (req, resp) => {
    resp.send('welcome+node')
})
app.get('/user/login', (req, resp) => {
    resp.send({name: 'guohua'})
})
```
/路由下使用了logger user/login不会输出日志
****

## cookie parser
```
// cookieparser cookie 解析 中间件
function cookieparser() {
    return function(req, resp, next) {
        req.cookies = {}
        const headerCookie = req.headers.cookie
        if(headerCookie) {
            const cookies= headerCookie.split(';')
            cookies.forEach((item) => {
                const pairs = item.split('=')
                req.cookies[pairs[0]] = pairs[1]
            })
            next()
        }
    }
}
app.use(cookieparser())
app.get('/', (req, resp) => {
    // resp.send('welcome+node')
    resp.send(req.cookies)
})
```

## 响应时长中间件
```
function responseTime() {
    return function(req, resp, next) {
        var now = Date.now()
        resp.once('finish', function() {
            console.log(Date.now() - now)
        })
        next()
    }
}
```

## 静态资源

    |———— app.js

    |———— public

        |-- style

        |-- app.css
```
express.static(root, [options])
```
```
app.use(express.static('./public'))
// 访问路径 localhost:8080/style/app.css
app.use('./public', express.static('./public'))
// 访问路径 localhost:8080/public/style/app.css
```