
/**
 * @mode 模式 development production none
 * @entry 入口文件路径
 * @output 出口文件生成的路径
 * @module  配置模块的处理规则
 * @resolve 配置寻找模块的规则 
 * @devtool 配置开发工具
 * @context 配置中解析入口的起点和loader
 * @externals 配置外部运行环境提供的模块
 * @devServer 配置开发服务器
 * @plugin 配置插件
 */
/**
 * 在不设置context情况下
 * entry会配置相对根目录的路径 
 * entry: './src/main',
 * 在配置context情况下
 * entry: './main',
 * context: path.resolve(__dirname, 'src')
 * 先由context来配置指定的路口 再由entry来配置路径
 */
/**
 * output 
 * filename 文件的输出路径
 */
/**
 * path 必须使用绝对路径
 * publicPath 把输出目录配置为浏览器环境下的URL
 * 假设构建的输出目录
 * |----build
 *   |----js
 *      |----main.js
 *   |----images
 *      |----logo.jpg
 *   |----css
 *      |----main.css
 *   |----index.html
 * 生成环境下的资源会托管到CDN上 但是默认资源都是相对于HTML的文件的地址
 * 如果线上的CDN地址为www.cdn.xxx.com/assets/ 那么build/js/main.js的URL地址应该就是
 * www.cdn.xxx.com/assets/js/main.js
 * 这时候就需要publicPath来配置前缀www.cdn.xxx.com/assets/
 */
/**
 * module
 * noParse
 * rules 通过test include exclude 匹配文件
 *       对匹配成功的文件执行loader 也可以传递数组loader执行由后向前
 *
 */
/**
 * resolve alias别名 $结尾严苛匹配
 * extensions 支持的拓展名
 * mainField 导入模块中配置，觉得导入具体哪一个
 */
/**
 * modules 决定去哪里寻找第三方模块
 * modules: [path.resolve(__dirname, 'lib'), 'node_modules']
 */
/**
 * externals 告知webpack哪些是由外部引入的 使得webpack打包时不会打包它们
 * 例如jquery
 */
/**
 * devServer
 * 配置服务
 */
/**
 * plugin
 * 拓展插件
 * 通过钩子函数 接受一个数组
 */
const path = require('path')
const MiniCSSPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: './src/main',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
        // filename: '[name][hash:16].js',
        // publicPath: '/',
        // library: '',
        // libraryTarget:'umd',
        // chunkFilename: '[name].[chunkhash:16].js'
    },
    module: { 
        rules: [
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader']  // 先执行cssloader 后执行styleloader
                use: [MiniCSSPlugin.loader, 'css-loader']
            }, 
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory'],
                include: path.resolve(__dirname, 'src') //只对src下的文件应用规则
            },
            {
                test: /\.less$/,
                use: ['less-loader','css-loader', 'style-loader'],
                exclude: path.resolve(__dirname, 'node_modules') // 排除node_modules下的less文件
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
        ],
        noParse: [
            /jquery/,
        ],
    },
    // resolve: {
    //     alias,
    //     mainFlieds,
    //     extensions,
    // },
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
    devtool:'source-map',
    context: '',
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        port: 8081,
    }
}