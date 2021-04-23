# KOA 博客项目

## 心得体会
KOA 项目中的路由,模板渲染,中间件的引用,自定义的中间件四个部分组成了KOA 博客项目

### 项目功能来确定整体代码结构

1. 登录登出功能
2. 发表文章查看文章
3. 通过路由和模板渲染来串联项目

代码目录结构

|- templates

|- index.js

|- middleWares

|- routes

|- services

index入口文件 templates 模板文件夹

middleware中间件文件夹 

routes中含有各个模块跳转， 提交修改删除功能， 登录登入功能

services 用户名，密码
         文章的更新发布删除展示查找功能


首先确定index.js下的主体,每当完成一个功能模块后在index.js下引入

### 登录登出

首先注册路由'/' 当cookie中设置logged有true 重定向到
'/index' 否则重定向到'/login'
```
router.get('/',  async (ctx, next) => {
    let logged = ctx.cookies.get('logged', {signed: true})
    if(logged) {
        ctx.redirect('/index')
    } else {
        ctx.redirect('/login')
    }
    await next()
})
```
登录页和index页的路由注册，因为index要展示已发布的文章 要使用service.list获取文章列表并渲染到index
```
router.get('/login', async (ctx) => {
    await ctx.render('login')
})
router.get('/index', async (ctx) => {
    await ctx.render('index', {
        list: Service.list()
    })
})
```
### login
在post请求中校验用户名密码是否正确，正确设置cookie跳转index 错误则提示
```
router.post('/login', async(ctx, next) => {
    const data = ctx.request.body
    if(userLogin(data)[1]) {
        // ctx.body = 'login success'
        ctx.cookies.set('logged', 1, {
            sign: true, 
            httppOnly: true,
            maxAge: 3600 * 24 * 1000 
        })
        ctx.redirect('/index')
        ctx.render('index')
    } else {
        // ctx.body = '用户名或密码错误'     
    }
    await next()
})
```
### logout
清除cookie 并跳转/
```
router.get('/logout', async(ctx) => {
    ctx.cookies.set('logged', 0, {
        sign: true, 
        httppOnly: true,
        maxAge: -1
    })
    ctx.redirect('/')
})
```

### publish
将内容保存在service中,添加自增id和创建时间，并跳转到'post/:postId'
```
router.post('/publish', async(ctx, next) =>{
    console.log(ctx.request.body, 'post publish')
    const data = ctx.request.body
    if(!data.title || ! data.content) {
        ctx.throw(400, '您的信息有误')
    }
    const item = Service.publish(data.title, data.content)
    ctx.redirect(`/post/${item.id}`)
})
```
### post/:postId
根据传入postId来展示文章
```
router.get('/post/:postId', async(ctx) => {
    const post = Service.show(ctx.params.postId)
    if(!post) {
        ctx.throw(404, '404 not found')
    }
    await ctx.render('post', {
        post: post
    })
})
```

### update/:postId
```
router.get('/update/:postId', async(ctx) => {
    const post = Service.show(ctx.params.postId)
    if(!post) {
        ctx.throw(404, '404 not found')
    }
    await ctx.render('update', {
        post: post
    })
})
```
编辑文字后保存提交 post请求到update,修改信息后跳转/post/:postId
```
router.post('/update', async(ctx, next) => { 
    const data = ctx.request.body
    if(!data.title || !data.content) {
        ctx.throw(400, 'your request has been 400')
    }
    Service.update(data.id, data.title, data.content)
    ctx.redirect(`/post/${data.id}`)
})
```
### delete
按ID删除返回新的数组 重定向到/
```
router.get('/delete/:postId', async(ctx) => {
    Service.delete(ctx.params.postId)
    await ctx.redirect('/')
})
```