# get post Ajax 封装
```
// get 
function AjaxGet(url) {
    return new Promise((resolve, reject) => {
        //创建异步对象
        var xhr = new XMLHttpRequest()
        //设置请求行open()
        xhr.open("get", url)
        //发送请求
        xhr.send(null)
        // 服务器成功响应         数据解析完毕可以使用了
        if(xhr.status == 200 && xhr.readyState == 4){
            resolve(xhr.responseText)
        } else {
            reject('error')
        }
    })
}
// AjaxGet('./1.json').then(res => {console.log(res)})

// post
function AjaxPost(url) {
    return new Promise ((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.setRequestHeader()
        xhr.withCredentials = true
        //设置请求行
        xhr.open('post', url)
        xhr.send('paramas')
        // 服务器成功响应         数据解析完毕可以使用了
        if(xhr.status == 200 && xhr.readyState == 4){
            resolve(xhr.responseText)
        } else {
            reject('error')
        }
    })
}
// AjaxPost('./1.json').then(res => {})
```