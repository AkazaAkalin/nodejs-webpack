# 模板渲染

```
const render = require('koa-ejs')
render(app, {
    root: './template',
    layout: false, // 局部模板渲染
    viewExt: 'html' // 选择模板文件拓展名 ejs/html
})
router.get('/view', async (ctx) => {
    ctx.state.name = 'guohua'
    await ctx.render('view',  {
        now: new Date().toString(),
        title: 'html'
    })
})
app.use(router.routes())
app.use(router.allowedMethods())
```
在ejs路由下使用了template的view.html渲染页面
```
view.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>
</head>
<body>
    <h1>view</h1>
    <p><%= name %> <%= now %></p>
</body>
</html>
```
****
### 也可以设置使用ejs模板

修改viewExt的值为ejs
****
另外还有koa-views也可以来渲染html模板
```
// const views = require('koa-views')
// app.use(views('./template', {
//     map: {
//         html: 'ejs' //将ejs 转成html来作为模板渲染
//     },
//     // extension: 'ejs'
// }))
// router.get('/views', async (ctx) => {
//     ctx.state.name = 'guohua'
//     await ctx.render('view',  {
//         now: new Date().toString(),
//         title: 'html'
//     })
// })
// app.use(router.routes())
// app.use(router.allowedMethods())
```

### 局部模板渲染

```
const render = require('koa-ejs')
render(app, {
    root: './template',
    layout: 'index',
    viewExt: 'html'
})
router.get('/view', async (ctx) => {
    ctx.state.name = 'guohua'
    await ctx.render('view',  {
        now: new Date().toString(),
        title: 'view'
    })
})
```
```
index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <header>header</header>
    <%- body %>
    <footer>footer</footer>
</body>
</html>
```
```
view.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>
</head>
<body>
    <h1>view</h1>
    <p><%= name %> <%= now %></p>
</body>
</html>
```