# Node.js 基础介绍

## 1.nodejs基于chromeV8引擎的JavaScript运行环境，采用事件驱动，非阻塞IO模式

## 运行原理与非阻IO

### nodejs运行时，开启JS主线程，和用线程池来作为事件队列 当有IO操作时，主线程会直接调用线程池来注册回调函数，不会等待IO结束就继续进行

## 2.优缺点

### 轻型高效，使用JS语言方便开发，缺点就是单线程，当出现线程阻塞

# restful风格

## 1. URL设计 动词+宾语 

动词 一律大写
1.get
2.post
3.put
4.delete
5.patch
6.option
宾语 名字

复数的URL 用?拼接参数

## 2.状态码
略过吧
## 3. 服务器响应

服务器响应回来应该是一个json数据对象因此服务器回应的http头部 application/json

## 4. 如果发生错误请不要返回200
