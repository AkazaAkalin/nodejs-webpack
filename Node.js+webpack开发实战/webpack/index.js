const Koa = require('koa')
const staticMiddle = require('koa-static')
const WebSocket = require('ws')

const app = new Koa()
app.use(staticMiddle(__dirname + '/public'))

const server = app.listen(8080)

const websocketServer = new WebSocket.Server({
    server
})

const clients = new Set()
function broadcast(message) {
    for(const client of clients) {
        const {ws, address} = client
        ws.send(message, (err) => {
            if(err) {
                console.log(`[Broadcast] ${address} error: ${err.message}`)
                clients,delete(client)
                broadcast(`${address}  disconnected`)
            }
        })
    }
}
websocketServer.on('connection', (ws, request) => {
    const address = request.connection.remoteAddress+ ":" + request.connection.remotePort
    const client = { ws, address }
    clients.add(client)
    broadcast(address + '连接了')
    ws.on('message', (message) => {
        broadcast(`${address}: ${message}`)
    })
})