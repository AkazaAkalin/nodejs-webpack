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