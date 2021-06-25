# JS类型转换
typeof (NAN) === "number"
## 变量之间的加减
如果有一个是字符串，相加就是进行拼凑； 相减会转换成数字进行相减，如果结果不是numner就是NAN，true false 会转换成1，0 进行相减
## 数字与字符串会转换成数字进行比较
# JS bind call apply 改变this指向
```
function bind(fn, obj) {
    return function() {
        return fn.apply(obj, arguments)
    }
}
function foo(param) {
    console.log(this.a + param)
    return this.a + param
}
bind(foo, {a:123})(123)
```
```
Function.prototype.mycall = function(obj, param) {
    context = obj || window
    const fnSymbol = Symbol('fn')
    context[fnSymobol](param)
    delete context[fnSymbol]
}
```
```
apply
Function.prototype.myapply = function(obj, arr) {
    context = obj || window
    const fnSymbol = Symbol('fn')
    context[fnSymobol](...arr)
    delete context[fnSymbol]
}
```
bind
```
Function.prototype.mybind = function(obj, param) {
    context = obj || window
    const fnSymbol = Symbol('fn')
    return function() {
        context[fnSymobol](param)
        delete context[fnSymbol]
    }
}
```
Function.prototype._bind = function() {
    let self = this
    let context = [].shift.call(arguments)
    let params = [].slice.call(arguments)
    return function() {
        self.apply(context,[...params, ...arguments])
    }
}
fn.bind()
# JS 事件机制

## 同步异步事件

## promise
```
const PENDDING = 'pendding'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'
function mypromise(fn) {
    const status = PENDDING
    const value = ''
    const reason = ''
    const resolveCallBack = []
    const rejectCallBack = []
    const resolve = function(value) {
        this.status = RESOLVED
        this.value = value
        resolveCallBack.forEach(item =>{
            item(value)
        })
    }
    const reject = function (reason) {
        this.status = REJECTED
        this.reason = reason
        rejectCallBack.forEach(item =>{
            item(reason)
        })
    }
    try{
        fn(resolve, reject)
    }catch(err) {
        reject(err)
    }
}
```
```
Promise.then = function((onresolve, onreject)) {
    if(this.status == 'RESOLVED') {
        onresolve(value)
    }
    if(this.status == 'REJECTED') {
        onreject(reason)
    }
    if(this.status == 'PENDDING') {
        resolveCallBack.push(onresolve)
        rejectCallBack.push(onreject)
    }
}
```
```
Promise.all = function(promiseArr) {
    retrun new promise((resolve,reject)=> {
        let results = []
        let len = 0
        let length = promiseArr.length
        promiseArr.forEach(item=> {
            item.then(res=> {
                results.push(res)
                len ++
                if(len >= length) {
                    resolve(results)
                }
            }).catch(err=> {
                reject(err)
            })
        })
    })
}
```