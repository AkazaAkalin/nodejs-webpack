# async await
1. async 只能放在声明函数之前 被修饰后的函数就会传化为promise函数，返回值就是resolve的值，（fullfilled）如果抛出错误，返回值是错误对象（rejected）如果返回的一个promise（最终的promise结果为该promise的结果）
```
async function add(a, b) {
    return a+b
}
const add2 = async (a, b) => {
    return a+b
}
class Demo {
    async test(a, b) {
        return a+b
    }
}
```
1. await 只能使用在async函数内部，用于接收promise的返回值，如果promise返回错误 await将抛出错误，通过try/catch捕获
