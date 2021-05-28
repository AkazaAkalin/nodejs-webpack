const http = require('http')
const crypto = require('crypto')

const Sever = http.createServer((req, res) => {
    console.log(`${req.method}, ${req.url}`)
    res.end()
})
Sever.on('upgrade', (req, socket) => {
    const reqKey = req.headers['sec-webSocket-key'] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'
    const respKey = crypto.createHash('SHA1').update(reqKey).digest('base64')
    const respData = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        'Sec-WebSocket-Accept: ' + respKey,
        'Sec-WebSocket-Location: ws://' + req.headers.host,
        '\r\n'
    ]
    socket.write(respData.join("\r\n"))
    socket.on('data', (data) => {
        console.log(data.toString(), 'data')
    })
})

Sever.listen(8080, ()=> {
    console.log('listen on 8080')
})