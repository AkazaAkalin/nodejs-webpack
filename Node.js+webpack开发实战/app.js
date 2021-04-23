const http = require('http')
const fs = require('fs')

const hostname = '127.0.0.1'

const port = 3001
const mathAdd = require('./example')
const date = require('./date').date
const getData = (url) => {
    return new Promise((res, rej) => {
        fs.readFile(url, function(err, data) {
            if(err) {
                rej(err)
                return
            } else {
                res(data)
            }
        })
    })
}
getData('./test.txt').then(res => {
    console.log(res)
})
const sever = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('hello world\n') 
})
sever.listen(port, hostname, () => {
    console.log(mathAdd.sum(1,2), date('2021-3-14'))
    console.log(`Serve running at http://${hostname}:${port}/`)
})

// const { promises } = require('dns')
// fs.readFile('./test.txt', function(err, res) {
//     if(err) {
//         return
//     } else {
//         console.log(res)
//     }
// })