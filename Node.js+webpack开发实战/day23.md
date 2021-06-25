# VUE项目打包示例 

## webpack.config.js
```
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = {
    mode: 'production',
    entry: './src/main',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, 
            {
                test: /\.css$/,
                use: [process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'vue-style-loader','css-loader','postcss-loader']
            },
            {
                test: /\.js$/,
                use: 'babel-loader'
            }
        ]
    },
    resolve: {
        // extendsions: ['.js','.vue', '.json']
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['main'],
            template: 'index.html',
            filename: 'index.html'
        }),
        new VueLoaderPlugin(),
    ],
    devtool:'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        port: 8080,
    }
}
if(process.env.NODE_ENV === 'production') {
    config.plugins.push(new MiniCssExtractPlugin({
        filename: 'css/[name].css'
    }))
}
module.exports = config
```

# TypeScript 支持

## 解析.ts文件要安装依赖
npm install typescript ts-loader --save-dev

## 配置typescript 需要tsconfig.json
```
{
    "compilerOptions": {
        "target": "es5",
        "strict": true,
        "module": "es2015",
        "moduleResolution": "Node"
    },
    "include": [
        "src/**/*.vue",
        "src/**/*.ts"
    ]
}
```
src/vue-shim.d.ts 
配置ts 让ts识别Vue
```
declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}
```
webpack.config.js 处理ts片段
```
 {
    test: /\.ts$/,
    loader: 'ts-loader', 
    exclude: /node_modules/,
    options: {
        appendTsSuffixTo: [/\.vue$/]
    }
}
```
App.vue 引入了ts语法 
要在script 引入lang = 'ts', 引入Vue 并通过Vue.extend导出
```
<script lang = 'ts'>
import Vue from 'vue'
export default Vue.extend ({
    data() {
        return {
            msg: 'Hello World'
        }
    },
    methods: {
        handclick: async function () {
            const data = await this.sum(1,3)
            console.log(data)
        },
        sum(a: number, b: number) {
            return new Promise((resolve, reject)=> {
                resolve(a + b)
            })
        }****
    }
})
</script>
```