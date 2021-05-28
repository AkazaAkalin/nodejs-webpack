# 1. 传统web技术
## ajax polling 
周期性的请求服务器 浪费了http header 资源

## 服务器推送 comet
http请求被服务端挂起 当数据更新后发送响应数据，
如果长时间没有数据更新 客户端会再一次发送http请求，结果同ajax polling 

# 2. websocket
双向的
需要http来完成握手，建立连接
协议头ws:// wss:// 对应http https

请求报文
```
Upgrade: websocket
Connection: Upgrade
Host: example.com
Origin: http://example.com
Sec-WebSocket-Key: ,
Sec-WebSocket-Version: 1.3
```
响应头报文
```
HTTP/1.1 01 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept ,
Sec-WebSocket-Location
```

# 3. 实现websocket握手协议

## 过程
1.  客户端随机生成base64 编号作为 Sec-WebSocket-Key 发送给服务器
2.  服务器端接受 Sec-WebSocket-Key  后与固定秘钥链接
3.  服务端计算SHA1哈希值并进行base64编码
4.  服务器将basa64编码作为Sec-WebSocket-Key 发送给客户端
5.  客户端接受Sec-WebSocket-Key 并判断与本地计算的是否一致，一致则升级为Websocket
   