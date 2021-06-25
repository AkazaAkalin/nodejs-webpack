# 0.1+0.2
## js的数字存储方式

在js中数字 遵循IEEE754(?)的原则用64位表示一个数字(1+11+52)

1. 0符号位 0表示负 1表示正数
2. 1-11 代表指数部分e
3. 12-63 尾数 也就是小数部分，有效数字部分f

最大安全数字：Number.MAX_SAFE_INTIGER = MATH.pow(2,53)-1,
**因为二进制数的第一位总是1，尾数在默认形式下第一位默认为1剩下的52位**
转换成整数就是16位 所以0.1===0.1 在通过toPrecision(16)之后是成立的

在两个数字相加是 计算机会先将他们转化成二进制数字

[juejin原贴 JS的number存储](https://juejin.cn/post/6844903680362151950#heading-4)


# JS数据类型
## 基本数据类型 boolean string number undefined null symbol bigInt 
### 引用数据类型 array object

# 深拷贝
```
function deepCopy(obj) {
    let res = {}
    for(i in obj) {
        if(typeof(i) === 'object') {
            res[i] = deepCopy(obj)
        } else {
            res[i] = obj[i]
        }
    }
    return res
}

let deepCopy = object => {
    return  object.reduce((total, [key, value]) => {
        return typeof(value)== 'object'? {...total, [key]: deepCopy(value)} : {...total, [key]: value}
    }, {})
}
```


# 事件流
## 冒泡流和捕获流
### 冒泡由底层想上层 捕获由上层向下层

addeventlistener(methods, function, isbubble) 默认fasle 表示事件在冒泡流处理 （true捕获流）

w3c的方法是e.stopPropagation()，IE则是使用e.cancelBubble = truee.stopPropagation() 阻止冒泡

先进行捕获再进行冒泡
