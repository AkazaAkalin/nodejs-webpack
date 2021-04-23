const express = require('express')
const fs = require('fs')
const app = express();
const user = require('./user');
// const { query } = require('express');
const timeline = require('./timeline').router
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// 设置路由
/************************************************/
// app.get('/', (req, resp) => {
//     resp.send('主页')
// })

// app.get('/about', (res, resp) => {
//     resp.send('about')
// })

// app.get('/1.txt', (res, resp) => {
//     resp.send('1.txt')
// })
/*************************************************/ 
// app.get('/user/:userID/timelines/:timelineID', (req, resp) => {
//     resp.json(req.params)
// })
// http://localhost:8080/user/1/timelines/1  --> {"userID":"1","timelineID":"1"}

/*************************************************/ 
// app.get('/users/:firstName.:lastName', (req, resp) => {
//     resp.json(req.params)
// })
//http://localhost:8080/users/guo.hua --> {"firstName":"guo","lastName":"hua"}

/*************************************************/ 
// app.get('/', (req, resp, next) => {
//     console.log(`${req.method}${req.path}`)
//     next()
// }, (req, resp) => {
//     resp.send('首页')
// })
/*************************************************/ 
// app.route('/user/login').get((req, resp)=> {
//     resp.send('get')
// }).post((req, resp)=> {
//     resp.send('post')
// })
/*************************************************/ 
// app.use('/user', user)
// app.use('/timeline', timeline)
/*************************************************/ 
// app.use(cookieParser())
// app.use(bodyParser())
// app.get('/user/:userid', (req, resp) => {
//     resp.json({
//         method: req.method,
//         url: req.url,
//         header: req.headers,
//         hostname: req.hostname,
//         ip: req.ip,
//         query: req.query,
//         path: req.path,
//         cookies: req.cookies
//     })
// })
/*************************************************/ 
// app.post('/', (req, resp) => {
//     resp.json(req.body)
//     resp.send('123')
// })
/*************************************************/ 
// app.get('/hello', (req, resp) => {
//     resp.set('content-Type', 'text/plain')
//     resp.end('HelloWorld')
// })
/*************************************************/ 
// app.get('/download', (req, resp) => {
//     resp.download('./1.txt', '1.txt', err => {
//         err && console.warn('downloadFail', err)
//     })
// })
/*************************************************/ 
// app.get('/user/home', (req, resp) => {
//     resp.render('home', {name: 'guohua'})
// })
/*************************************************/ 
// app.get('/', (req, resp)=> {
//     resp
//     .cookie('logged', 'true', {
//         httpOnly: true, 
//         maxAge: 24 * 3600 * 1000 
//     })
//     .json({
//             cookies: req.cookies,
//             maxAge: req.maxAge
//     })
//     .end()
// })
/*************************************************/ 
// app.get('/', (req, resp) => {
//     resp.send({name: 'guohua'})
// })
/*************************************************/ 
// function logger(req, resp, next) {
//     console.log(`${req.method},${req.path},${req.headers['user-agent']}`)
//     next()
// }
// app.use(logger)
// app.get('/', (req, resp) => {
//     resp.send('welcome+node')
// })
// app.get('/user/login', (req, resp) => {
//     resp.send({name: 'guohua'})
// })
/*************************************************/ 
// function logger(req, resp, next) {
//     console.log(`${req.method},${req.path},${req.headers['user-agent']}`)
//     next()
// }
// app.get('/', logger, (req, resp) => {
//     resp.send('welcome+node')
// })
// app.get('/user/login', (req, resp) => {
//     resp.send({name: 'guohua'})
// })
/*************************************************/ 
// function logger(options) {
//     return function(req, resp, next) {
//         let result = []
//         options.method && result.push(req.method)
//         options.path && result.push(req.path)
//         options.userAgent && result.push(req.headers['user-agent'])
//         console.log(result)
//         next()
//     } 
// }
// app.use(logger({method: true, path: true, userAgent: true}))
// app.get('/', (req, resp) => {
//     resp.send('welcome+node')
// })
/*************************************************/ 
// function cookieparser() {
//     return function(req, resp, next) {
//         req.cookies = {}
//         const headerCookie = req.headers.cookie
//         if(headerCookie) {
//             const cookies= headerCookie.split(';')
//             cookies.forEach((item) => {
//                 const pairs = item.split('=')
//                 req.cookies[pairs[0]] = pairs[1]
//             })
//             next()
//         }
//     }
// }
// app.use(cookieparser())
/*************************************************/ 
// function responseTime() {
//     return function(req, resp, next) {
//         var now = Date.now()
//         resp.once('finish', function() {
//             console.log(Date.now() - now)
//         })
//         next()
//     }
// }
// app.use(responseTime())
// app.get('/', (req, resp) => {
//     // resp.send('welcome+node')
//     setTimeout(() => {
//         resp.send(req.cookies)
//     }, 1000);
// })
/*************************************************/ 
// app.get('/', (req, resp, next) => {
//     throw new Error('发生错误')
// })
// app.use((err, req, resp, next) => {
//     fs.writeFile('./app.log', `${req.message} ${req.url} ERROR: ${err.message}`, 
//     (err) => {
//         next(err)
//     })
// })
// app.use((err, req, resp, next) => { 
//     resp.json({
//         path: req.path,
//         message: err.message
//     })
// })
/*************************************************/ 
app.set('views', './templates')
app.set('view engine', 'ejs')
app.get('/', (req, resp, next) => {
    resp.render('app', {
        title: '用户列表',
        users: [
            {name :'guohua', id: 0},
            {name :'vvvvvv', id: 1}
        ],
        isShow: !! req.query.show
    })
})
// 设置监听端口
app.listen(8080, () => {
    console.log('listen on 8080')
})
