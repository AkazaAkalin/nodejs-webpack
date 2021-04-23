# 函数式编程

## 1.函数是一等公民
a. 函数可以存储在变量中
b. 函数可以作为参数
c. 函数可以作为返回值
```
// 函数的方法赋值给另一个方法 
const BlogController = {
  index(posts){
    return Views.index(posts)
  }
};
// 等同于
const BlogController = {
  index:Views.index
};

```
## 2. 高阶函数
### 可以把函数作为参数传递给另一个函数
### 可以吧函数作为另一个函数的返回结果
### 闭包 once函数示例
```
funtion sum(a, b) { return a+b }
sum(1,2)
funtion mySum(fn, a, b, otherfun) {
    return fn().call(a, b)
} 
mySum(sum, 0,1)
```
```
const forEach = (arr, fun) => {
    for(let i of arr) {
        fun(i)
    }
}
let arr = [5,6,4,4]
forEach(arr, item => {console.log(item)})
```
```
function once(fun, reason) {
    var done = false
    return function() {
        if(!done) {
            fun.apply(this,[].slice.call(arguments))
            // fun(n)
            done = true
        } else {
            console.log(reason)
        }
    }
}
let pay = once(function(n) {
    console.log('支付了'+ n +'元')
}, '已支付，请勿重复操作')
pay(1000)
pay(1000)
```
## 纯函数 
相同的输入永远会得到相同的输出，
slice,splice 分别为纯函数和非纯函数 splice改变了原数组

# bigint 应用场景
BigInt 是 JavaScript 中的一种新的数值原始数据类型，它可以用来表示任意精度的整形值。
```
1234567890123456789n * 123n;
// → 151851850485185185047n 
```
# bind 后的函数还能改变this指向吗
不能
```
let o1 = {
    a: 1
};
let o2 = {
    a: 2
};
let o3 = {
    a: 3
};

function fn(b, c) {
    console.log(this.a + (b||0) + (c||0));
};

let fn1 = fn.bind(o1);
let fn2 = fn1.bind(o2);
let fn3 = fn2.bind(o3);
fn3()
```
控制台打开fn1

![](https://oscimg.oschina.net/oscnet/7563189105f7569a316a83b2452b1fae915.png)

它成为了一个绑定函数'bound fn'

它的TargetFunction指向了bind前的的函数，BoundThis就是绑定的this指向，BoundArgs便是传入的其它参数了。

当我们执行fn1时，就有点类似于TargetFunction.apply(BoundThis,BoundArgs)。

当我们再次bind时, 其结果不会跟着改变
```
//尝试再次传入形参
fn1(4, 4); //6

//尝试改变this
fn1.call(o2); //6
```
