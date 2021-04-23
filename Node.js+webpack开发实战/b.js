const fs = require('fs')
// let data = ''
const ReadStream = fs.createReadStream('./a.js', {encoding: 'utf-8'})
const WriteStream = fs.createWriteStream('./b.js', {encoding: 'utf-8'})
ReadStream.pipe(WriteStream)
WriteStream.on('finish', () => {
    console.log('写入完成')
})
// stream.on('data', (chunk)=> {
//     data += chunk
// })
// stream.on('end', (data) => {
//     console.log(data, 'data')
// })
// stream.on('error', (err)=>{
//     console.log(err, 'err')
// })
// console.log('over')

// const http = require('http')
// const req = http.request('http://static.ddhigh.com/blog/2019-09-18-094336.jpg',
//     (response) => {
//         console.log(response.statusCode)
//         response.pipe(fs.createWriteStream('logo.jpg'))
//     }
// )
// req.end()