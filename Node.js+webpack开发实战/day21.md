# webpack

1. ## 安装
   ```
   webpack
   webpack-cli
   配置指令： "start": "webpack --config webpack.config.js"
   ```
2. ## webpack.config.js
```
const path = require('path')
const MiniCSSPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/main',
    output: {
        // mode: 'development',
        filename: 'bundle.js',
        path: path.resolve(__dirname, './build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader']
                use: [MiniCSSPlugin.loader, 'css-loader']
            }, 
            {
                test: /\.(gif|jpg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]',
                            esModule: false,
                            // publicPath: 'build'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCSSPlugin({
            filename: 'css/[name].css'
        }),
        new HtmlWebpackPlugin({
            chunks: ['main'], 
            filename: 'index.html', // 构建后的文件名
            template: 'index.html' // 源文件名
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        port: 8081,
    }
}
```
webpack打包配置都在这里, 
+ entry 入口文件
+ output 出口文件的路径
+ module: 对于图片，css文件打包的规则配置 css会被默认打包的js文件中若想要单独打包css 需要插件plugin
+ plugin: 插件 负责拓展打包的规则配置


3. ## Loader
    处理css 图片文件的模块 使用之前要安装，在module rules中使用
    
    + loader 加载是由后向前的
    + loader 选项要通过JS对象的形式传入
    + loader 对于不同的支出选项不同,参照文档使用
4. ## plugin

    插件拓展webpack功能 通过注入钩子函数来实现

    ### 提取css文件的plugin
    1. 安装
    2. 
        ```
        const MiniCSSPlugin = require('mini-css-extract-plugin')
        ```
        引入对象 
        ```
        plugins: [
            new MiniCSSPlugin({
                filename: 'css/[name].css'
            }),
            new HtmlWebpackPlugin({
                chunks: ['main'], 
                filename: 'index.html', // 构建后的文件名
                template: 'index.html' // 源文件名
            })
        ]
        ```
        实例化对象


5. ## 服务端开发
```
npm install webpack-dev-server -save-dev
```
为避免反复构建,来配置webpack-dev-server 

开启devServer 会开启一个http服务并启动一个webpack 

通过websocket来进行实时预览
```
devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        port: 8081,
    }
```
