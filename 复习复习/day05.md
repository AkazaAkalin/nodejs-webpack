# 判断一个对象是否为空
 判断长度
# 判断一个变量是数组还是对象
var a = []
1. Array.isArray(a)
2. Object.prototype.toString === '[Object, Array]'
3. a instanceof(Array)
4. a.constructor == Array
5. Object.getPropertyOf(a) == 'Array'

# 问： <script src=’xxx’ ’xxx’/>外部js文件先加载还是onload先执行，为什么？
onload 是所以加载完成之后执行的

# 事件监听 
on+事件， addEventListener
```
function AddEventListener(domID, type, fn) {
    var dom = document.getElementById(domID)
    dom['on'+type] = fn
}
```
on 事件会被覆盖, addEventListener 事件会存入栈中

# getUrlParams(url,key); 就是很简单的获取url的某个参数的问题，但要考虑边界情况，多个返回值等等

```
function getUrlKey(strUrl, key) {
    let url = strUrl || ''
    url = url.slice(url.indexOf('?')+1)
    if(url) {
        let urlArr = url.split('&')
        let obj = {}
        urlArr.map(item => {
            // console.log(item.split('=')[0])
            obj[item.split('=')[0]] = item.split('=')[1]
        })
        if(obj[key]) {
            return obj[key]
        } else {
            return 'no key'
        }
    } else {
        return 'no url'
    }
}
```
indexOf 查找?所在位置并用slice截取
split分割成数组，再次循环分割出key与value
obj[key] = value

 # 数组方法

 # 数组乱序

 ```
 let arr = [0,1,2,3]
 arr.sort(()=>{
    return Math.random() - 0.5
 })
 ```

 # 数组方法
 ```
 push/pop
 join/concat
 splice/slice // 替换，截取
 shift/unshift
 sort/reverse
 ```
 ```
 slice(num) 只有一个参数，截取num到末尾的数组，如果num为负数就从倒数开始计算
 slice(num1,num2) 截取num1,num2的数字 不包括num2
num为负数 从倒数开始计算
 ```
 # arguments 是类数组，类数组转化成数组的方法
```
...运算符
Array.from()
Araay.prototype.slice.call(arguments)
```
 # PWA 渐进式网络应用
[PWA 掘金贴](https://juejin.cn/post/6844904052166230030#heading-8)

# ES6 
```
function foo(name){
    this.name = name
}
foo.prototype.say = function() {
    return this.name
}
function Bar(name, label) {
    foo.call(this,name)
    this.label = label
}
Bar.prototype = Object.create(foo.prototype)
Bar.prototype.sayLabel = function () {
    return this.label
}
Bar.prototype.constructor = Bar
var bar = new Bar('bar', 'label')
```
## 一个构造函数，bind一个对象，用这个构造函数创建出一个实例，这个实例不会继承bind来的对象的属性

### 因为new会优先于bind绑定 在new的过程中，会创建一个新的对象，并且这个对象代替bind的对象绑定，作为函数的this，返回这个新建的对象
```
let obj = {
    name: 'AAA',
    type: 'normal'
}
function Foo(id) {
    this.id = id
    console.log(this.type)
}
Foo.bind(obj)()
var Fo = new Foo('fo')
```
## 箭头函数与普通函数

### 箭头函数中没有this，普通函数中this指向引用这个函数的空间，箭头函数的this指向创建这个函数的空间
```
var a = 'window'
function foo() {
    var a = 'foo'
    return () => {
        console.log(a)
    }
}
function fooo() {
    this.a = 'fooo'
    var self = this
    return function() {
        console.log(self.a)
    }
}
```
## Class 中 static关键字
### static关键字 表示静态方法或者变量 不会被实例继承只能被类来调用
```
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    static selfFn = function() {
        return 
    }
    static head = 1
}
var p1 = new Person('g',25)
```
## extends
```
class Coder extends Person {
    constructor(name,age,codeId) {
        super(name, age)
        this.UserId = codeId        
    }
    showCodeId() {
        super.showName()
        console.log(this.UserId)
    }
}
let coder1 = new Coder('g', 10, 20210309)
Coder.head // 1

```
静态资源也可以继承，同样的只能没被类本身调用，而实例不能调用