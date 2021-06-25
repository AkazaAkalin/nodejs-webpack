# prototype
## 原型是在类上的一个属性对象，所有由类创建出的实例都可以继承所属类的原型对象上的属性和方法

```
function Person(name) {
    this.name = name
}
Person.prototype = {
    this.constructor = Person
    this.head = 1
    this.hands = 2
    this.canThink = true
}
var person1 = new Person('Aody')
var person2 = new Person('Jimmy')
person1.__proto__.canThink = false
console.log(person1.__proto__, person2)
```
修改 实例中的原型属性会改变类的原型属性，进而污染了同类对象的所有实例，在开发中尽量不要通过实例来修改原型对象上的属性

```
function Student(name, code) {
    this.code = code
    Person.call(this, name)

}
Student.prototype = {
    ...Person.prototype,
    study: function() {
        console.log('i study everyday')
    }
}
Student.prototype = Person.prototype
var student1 = new Student('Lyric',20201111)
```
构造函数继承：使用call方法引用父类Person,并将父类原型赋值给子类原型

### 寄生继承

```
function extend(obj) {
    function F() {}
    F.prototype = obj
    return new F()
}
// 返回一个以obj为原型的空对象
var obj = {
    a: 'a',
    b: 'b'
}
var eg = extend(obj)
eg.say = function(word) {
    console.log('say', word)
}
eg.say('hello')
```
```
function inhert (child, parent) {
    let prototype = Extend(parent.prototype)//  创建一个空函数（以父类原型为原型）
    prototype.constructor = child // 空函数的构造者为子类
    prototype.method = function(word) {
        console.log(word)
    } // 函数的自有方法
    child.prototype = prototype // 子类的原型就是这个空函数
    return child
}
// 
function Coder(name, code) {
    this.code = code
    Person.call(this, name)
}
inhert(Coder, Person)
var coder1 = new Coder('Ha', 123321)
var coder2 = new Coder('Java', 20202020)
coder1.skill.push('program')
```
## es6 Class 继承
```
class Humen {
    constructor() {
        this.eyes = 2
        this.legs = 2
        this.skill = ['run', 'eat']
    }
    say(word) {
        console.log(word, this.skill)
    }
}
class solder extends Humen {
    constructor() {
        super() // 继承父类的构造属性
        this.haveGun = true
        this.attack = 100
    }
    attacking() {
        console.log('attack', this.attack, this.eyes)
    }
}
let solder1 = new solder()
```

# JS 脚本加载
```
<script src="script.js"></script>
```
1. 如果没有defer async 浏览器会立即执行指定脚本，立即是指在这个script 标签下的DOM元素要等待这个script标签加载完成之后再进行载入 
```
<script async src="script.js"></script>
```
2. async 会在和渲染后续文档元素的过程将和JS文件异步进行
3. defer 在加载后续文档元素的过程将和JS文件异步，但是JS执行要在所有的元素解析之后 DOMContentLoaded事件之前完成

[html与JS解析时间图](./../markdowm截图/htmlJS解析图.jpg)
