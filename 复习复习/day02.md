# new一个函数发生了什么

### 首先创建了一个空的对象obj，并将obj的隐世原型指向了要创建的对象的原型，最后这个新的obj使用要创建对象的this并返回
```
function new(fn, param1,param2...) {
    let obj = {}
    let constructorFn = Array.shift.call(arguments)
    obj.__proto__ = fn.prototype
    constructorFn.apply(obj, arguments)
    return obj
}
```
## new一个构造函数，如果返回 return{}， retrun 1, return true 

### 如果返回一个对象 那么new返回这个函数的返回对象，否则返回的new创建的新对象

# symbol 数据类型

## 作为唯一属性防止变量名冲突

## symbol 不可以被枚举遍历 （除了Object.getOwnPrepertySymbols）

###  symbol.iterator 的对象才可以使用 for...of 循环。调用会返回一个对象，包含一个next方法，使用next方法返回值value和done表示当前的值和是否完成了遍历
```
let sy = Symbol("KK");
console.log(sy);   // Symbol(KK)
typeof(sy);        // "symbol"
 
// 相同参数 Symbol() 返回的值不相等
let sy1 = Symbol("kk"); 
sy === sy1;       // false
```
```
let sy = Symbol('key')
let syObject = {}
syObject[sy] = 'kk'
// syObject = {
//    [sy] : 'kk'
// }
/*
Object.defineProperty(syObject,sy,{value:'kk'})
*/
```
```
let syObject = {};
syObject[sy] = "kk";
console.log(syObject);
 
for (let i in syObject) {
  console.log(i);
}    // 无输出
 
Object.keys(syObject);                     // []
Object.getOwnPropertySymbols(syObject);    // [Symbol(key1)]
Reflect.ownKeys(syObject);                 // [Symbol(key1)]
```
```
Symbol.for()
Symbol.for() 类似单例模式，首先会在全局搜索被登记的 Symbol 中是否有该字符串参数作为名称的 Symbol 值，如果有即返回该 Symbol 值，若没有则新建并返回一个以该字符串参数为名称的 Symbol 值，并登记在全局环境中供搜索。

let yellow = Symbol("Yellow");
let yellow1 = Symbol.for("Yellow");
yellow === yellow1;      // false
 
let yellow2 = Symbol.for("Yellow");
yellow1 === yellow2;     // true
Symbol.keyFor()
Symbol.keyFor() 返回一个已登记的 Symbol 类型值的 key ，用来检测该字符串参数作为名称的 Symbol 值是否已被登记。

let yellow1 = Symbol.for("Yellow");
Symbol.keyFor(yellow1);    // "Yellow"
```

# 闭包

## 函数内部嵌套一个函数 内部函数可以访问外部函数的变量，并且这个变量不会被释放掉，因为JS在回收垃圾时 判断外层函数的变量被内层函数‘引用’，因此不会被回收掉，就留存在内存中了

###
```
function closesure() {
        let i = 0
        return function() {
            console.log(i++)
        }
    }
let close1 = closesure()
close1(); // 0
close1(); // 1
```
作用域，在函数执行开始时， 会创建一个作用域，在这个作用域内部执行逻辑，并且这个执行环境会被存入执行环境的栈中，当函数执行完之后，函数的执行环境出栈，把执行权返回上一级的执行环境， 最外层的执行环境是就是全局的环境
# 闭包应用--克里化

```
function add (x,y) {
    return x+y
}
function CURRY(fn, args) {
    let arg = args || []
    let length = fn.length
    return function() {
        let newArgs = [].slice.call(arguments)
        let allargs = [...arg, ...newArgs]
        if(allargs.length< length) {
            return CURRY(fn, allargs)
        } else {
            return fn.apply(this, allargs)
        }
    }
}

let curry = CURRY(add)
curry(1)(2) == add(1,2)
```
# typeof NAN == 'number'


