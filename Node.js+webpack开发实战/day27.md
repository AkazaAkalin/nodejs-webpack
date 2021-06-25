# 性能优化

## 限定webpack的处理范围
+ loader 中设置include
+ noParse
+ resolve.extensions
+ IgnorePlugin

## DllPlugin
类似于windows中的.dll文件 这些文件叫动态链接库

webpack中沿用了.dll文件的思想,包含大量复用模块的动态链接库只需要编译一次，之后的构建中会链接引用哲学构建好的模块

webpack使用动态链接库有一下两个步骤
1. 通过webpack.DllPlugin插件打包出DLL库
2. webpack.DllRefenrencePlugin引用打包好的Dll库

以下以react来说明使用

### 新建webpack.dll.config.js
### webpack.config.js
### 构建DLL，构建应用

## HappyPack
webpack构建时是单进程执行的，通过happypack可以变成多进程构建, 从而提升构建的速度

1. 安装HappyPack
2. 在loader中配置HappyPack

## Tree-Shaking
摇动树，在webpack中有一个入口文件相当于大树的主干，入口文件依赖了许多模块，在实际的开发中，虽然依赖了某一个模块但是只使用了其中的部分代码，通过treeshaking，可以将模块中未使用的代码剔除，从而减少构建结果的大小。

要注意的是，只有使用ES6模块系统的代码，在node为production时，Treeshaking才会生效，因此在编写代码尽量使用import export的方式

## 按需加载

在开发中我们一般会将业务代码打包为app.js 其他第三方依赖打包vendor.js 这样会有一个比较大的问题，如果第三方模块过多vendor.js会越来越大，产生了无谓的等待，因此要我们使用按需加载相应的JS


比如我们在使用Echarts开发一个数据可视化的页面，可以通过这个路由组件下面使用异步的方式加载Echarts的代码
```
import('echarts').then(modules => {
    const echarts = modules.default;
    const chart = echarts.init(getElementById('#chart'))
})
```
不过使用按需加载时，构建代码中会包含promise调用，因此低版本的浏览器需要注入promise的polyfill来实现

## 提取公共代码
webpack4 中可以将多个公共模块打包一份，减少冗余的代码，webpack4之前的版本是使用CommonsChunkPlugin实现的，Webpack4直接配置optimization即可
```
module.exports = {
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    chunks: 'all',
                    minChunks: 2
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'all',
                    minChunks: 1
                }
            }
        }
    }
}
```
## 热更新

HMR是webpack常用功能之一，它允许在运行时修改代码，无需刷新整个页面

他的优势

* 保留应用状态，比如使用Vue/React如果是用了LiveReload组件状态就会全部消失，而HMR就不会
* 只更新发生改变的内容 

```
const webpacl = require('webpack')

module.exports = {
    devServer: {
        hot: true,
        contentBase: '',

    },
    plugins: [
        new webpack.NameModulesPlugin(),
        new webpack.HotModulesReplacementPlugin()
    ]
}
```