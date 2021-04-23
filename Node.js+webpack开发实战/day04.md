# 常用核心模块

## events // 典型的订阅-发布者模式
## 基本使用
### 1.实例化组件
### 2. 注册事件
### 3. 触发事件
```
const Events = require('events')
const emitter = new Events()
emitter.on('click', function(param) {
    console.log(param)
})
emitter.emit('click','demo')
```

### 一次性监听
```
emitter.once('xx', function() {})
```

## fs模块
### 1. fs读取文件
```
const fs = require('fs')
// fs.readFile(path[, options], callback)
// 1.文件路径
// 2.选项
// 3. 回调函数
fs.readFile('./1.json', 'utf-8', (err, data) => {
    if(err) {
        return
    } else {
        // data
    }
})
```
### 2. 写入文件
```
// fs.writeFile(path, content[, options], callback)
// 1.path 文件路径
// 2.content 文件内容
// 3.options 选项
// 4.callback 回调函数
```
### 3.追加内容
```
// fs.appendFile(path, content[, options], callback)
// 1.path 文件路径
// 2.content 文件内容
// 3.options 选项
// 4.callback 回调函数
```

### 4.删除文件
```
fs.unlink(path, callback)
// fs.rmdir 删除文件夹
```
### 5.创建文件夹
```
fs.mkdir(path[, options], callback)
```
### 6.读取文件内容
```
fs.readdir(path[, options], callback)
```
# stream 接口
## stream 是 EventEmitter的实例，有一下常用事件
1. data
2. end
3. error
4. finish
## node.js中stream有一下4类型
1. Readable
2. Wirteable
3. Duplex
4. Transform

## 1.读取流
```

```
# http模块