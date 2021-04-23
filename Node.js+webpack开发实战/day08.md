# 异常处理

## 同步错误
```
throw new Error('xxx')
```
通常的同步错误交给框架自动处理
## 异步错误
```
app.get('./', (req, resp, next) => {
    fs.readFile('./1.txt', (err, data) {
        if(err) {
            next(err)
            return
        }    
        resp.end(data)
    })
})
```
## 输出log
```
app.get('/', (req, resp, next) => {
    throw new Error('发生错误')
})
app.use((err, req, resp, next) => {
    fs.writeFile('./app.log', `${req.message} ${req.url} ERROR: ${err.message}`, 
    (err) => {
        next(err)
    })
})
app.use((err, req, resp, next) => { 
    resp.json({
        path: req.path,
        message: err.message
    })
})
```

# 模板渲染

## ejs 模板
```
app.set('views', './template')
app.set('view engiee', 'ejs')
app.get('/', (req, resp, next) => {
    resp.render('')
})
```
ejs
```
    <% if(isShow) { %>
        <ul>
            <% users.forEach((user)=> { %>
                <li><%= user.id %> -- <%= user.name %></li>
            <% }) %>
        </ul>
    <% } %>
```
