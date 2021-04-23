// 本质是语法糖 对promise的语法修改
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
const data = async function() {
    let result1 = await add(1,2)
    let result2 = await add2(2,2)
    console.log(result1, result2)
}
data()

// 包装XMLhttprequest
const ajaxGet = function(url, timeout) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open('get', url, true)
        xhr.onload = function () {
            resolve(xhr.responseText)
        }
        xhr.timeout = timeout
        xhr.onerror = function (e) {
            reject(e)
        }
        xhr.ontimeout = function () {
            console.log('timeout')
        }
        xhr.send()        
    })
}
async function getData(url) {
    let data = await ajaxGet(url, 3000)
    console.log(data)
}
getData('https://juejin.cn/')