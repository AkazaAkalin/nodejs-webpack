# 自定义loader

## webpack的loader 是一个commonJs的函数
```
modules.export = function (source, sourceMap, meta) {
    // source 是输入的内容
    // sourceMap 是可选的
    // meta 是模块的元数据，可选的
}
```
要注意的是 必须使用function 不能使用箭头函数，因为loader中的要使用到this来访问选项和其他方法

## 创建示例

1. 目录
   {
       loader: {
           replace-loader.js
       }****
       src: {
           index.js
       }
       package.json
       webpack.config.js
   }
2. replace-loader.js
```
mudules.exports = function(words) {
    return words.replace(/world/g, 'Loader')
} 
```
3. src/index.js
```
console.log('hello, world')
```
4. webpack.config.js
```
module: {
    rules: [
        {
            test: /\.js$/,
            use: 'replace-loader'
        }
    ]
},
resolveLoader: {
    modules: ['./node_modules', './loader'] // 配置loader的查找目录
}
```
5. loaders 选项
   在使用loader时 会遇到options
   在开发中 先安装loader-utils
```
const loaderUtils = require('loader-utils')

module.exports = function(source) {
    const options = loaderUtils.getOptions(this)
    return source.replace(/world/g, 'Loader')
}
```
6.异步Loader
```
const callback = this.async()

setTimeout(()=>{
    const output = source.replace(/world/g, 'Loader')
    callback(null, output)
}, 1000)
```
7. Raw Loader
8. **配置loader**