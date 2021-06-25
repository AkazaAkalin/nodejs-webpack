// get 
// function AjaxGet(url) {
//     return new Promise((resolve, reject) => {
//         //创建异步对象
//         var xhr = new XMLHttpRequest()
//         //设置请求行open()
//         xhr.open("get", url)
//         //发送请求
//         xhr.send(null)
//         // 服务器成功响应         数据解析完毕可以使用了
//         if(xhr.status == 200 && xhr.readyState == 4){
//             resolve(xhr.responseText)
//         } else {
//             reject('error')
//         }
//     })
// }
// AjaxGet('./1.json').then(res => {console.log(res)})

// post
// function AjaxPost(url) {
//     return new Promise ((resolve, reject) => {
//         var xhr = new XMLHttpRequest()
//         xhr.setRequestHeader()
//         xhr.withCredentials = true
//         //设置请求行
//         xhr.open('post', url)
//         xhr.send('paramas')
//         // 服务器成功响应         数据解析完毕可以使用了
//         if(xhr.status == 200 && xhr.readyState == 4){
//             resolve(xhr.responseText)
//         } else {
//             reject('error')
//         }
//     })
// }
// AjaxPost('./1.json').then(res => {})
// jq Ajax
// $.ajax({
//     type: "GET",  //默认get
//     url: "url",  //默认当前页
//     data: "data",  //格式{key:value}
//     dataType: "json",
//     beforeSend: function () {}, //请求发送前回调,常用验证
//     success: function (response) {  //请求成功回调

//     },
//     error: function (e) {  //请求超时回调
//         if(e.statusText == "timeout"){
//             alert("请求超时")
//         }
//     },
//     complete: function () {}, //无论请求是成功还是失败都会执行的回调，常用全局成员的释放，或者页面状态的重置
// })



// event 
let event = {}

event.on = function (type, fun) {
    this[type] = fun
}
event.emit = function (type, params) {
    if (this[type]) {
        this[type].call(this, params)
    } else {
        return 'this method is not exist'
    }
}
event.on('say', function (str) {
    console.log('say' + str)
})
event.emit('say', 'emit')