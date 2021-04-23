# 事件机制

## 事件循环机制从整体上告诉了我们 JavaScript 代码的执行顺序
Event Loop即事件循环，是指浏览器或Node的一种解决javaScript单线程运行时不会阻塞的一种机制，也就是我们经常使用异步的原理。
先执行宏任务队列，然后执行微任务队列，然后开始下一轮事件循环，继续先执行宏任务队列，再执行微任务队列。

宏任务：script/setTimeout/setInterval/setImmediate/ I/O / UI Rendering
微任务：process.nextTick()/Promise  

上述的 setTimeout 和 setInterval 等都是任务源，真正进入任务队列的是他们分发的任务。
```
for(let macroTask of macroTaskQueue) {
    handMacroTask()
    for(let microTask of microTaskQueue) {
        handMicroTask()
    }
}
```
# 多维数组变一维数组

## [1,[1,2],[1,[2,3]],[1,[2,[3,4]]]] =>[1,1,2,1,2,3,1,2,3,4]

```
function fatten(arr) {
    let result = []
    arr.map(item=> {
        if(Array.isArray(item)) {
            result = result.concat(fatten(item))
        } else {
            result.push(item)
        }
    })
    return result
}
fatten([1,[1,2],[1,[2,3]],[1,[2,[3,4]]]])
fatten([1,[1,2]])
```
# 函数克里化
```
function add (x,y) { return x + y }
function Curry(fn, args) {
    console.log(fn.length)
    var len = fn.length ;
    var args = args || [];
    return function() {
        let newArgs = [].slice.call(arguments)
        let allArgs = [...newArgs,...args]
        if(allArgs.length < len) {
            return Curry.call(this, fn, allArgs)
        } else {
            return fn.apply(this,allArgs)
        }
    }
}
let curryAdd = Curry(add)
// curryAdd(1)(2) == add(1,2)
```

# let 闭包
## let 会产生临时性死区，在当前的执行上下文中，会进行变量提升，但是未被初始化，所以在执行上下文执行阶段，执行代码如果还没有执行到变量赋值，就引用此变量就会报错，此变量未初始化。
