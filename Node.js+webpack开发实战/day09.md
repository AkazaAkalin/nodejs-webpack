# 留言板

## index.js
```
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.set('views', './templates')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
const message = []
app.get('/', (req, resp) => {
    resp.render('index', { message })
})
app.route('/publish')
    .get((req, resp) => {
        resp.render('publish')
    })
    .post((req, resp) => {
        console.log(req.body)
        if(!req.body.name || !req.body.content) {
            throw new Error('please input correct context')
        }
        const now = new Date().toLocaleString() 
        message.push({
            name: req.body.name,
            content: req.body.content,
            time: now
        })
        resp.redirect('/')
    })
app.listen('8081',() => {})
```
## index.ejs
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>留言列表</title>
</head>
<body>
    <a href="/publish">发布留言</a>
    <% if(message.length === 0) { %>
        <h2><p>当前没有留言</p></h2>
    <% } else { %>
        <table>
            <tr>
                <th>留言人</th>
                <th>内容</th>
                <th>留言时间</th>
            </tr>
            <% message.forEach((item)=> { %>
            <tr>
                <th><%= item.name %></th>
                <th><%= item.content %></th>
                <th><%= item.time %></th>
            </tr>
            <% }) %>
        </table>
    <% } %>
</body>
</html>
```
## publish.ejs
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>发布留言</title>
</head>
<body>
    <form action="/publish" method="POST">
        <fieldset>
            <legend>发表留言</legend>
            <div>
                <label for="name">留言人</label>
                <input type="text" name='name' required>
            </div>
            <div>
                <label for="content">留言内容</label>
                <textarea name="content" id="" cols="30" rows="10"></textarea>
            </div>
            <div>
                <button type="submit">提交</button>
                <button type="reset">重置</button>
            </div>
        </fieldset>
    </form>
</body>
</html>
```