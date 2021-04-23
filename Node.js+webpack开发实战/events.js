const Events = require('events')
const emitter = new Events()
emitter.on('click', function(param) {
    console.log(param)
})
emitter.emit('click','demo')
emitter.emit('click','demo')
