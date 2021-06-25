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
            }, 
            {
                test: /\.ts$/,
                loader: 'ts-loader', 
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js','.vue', '.json']
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