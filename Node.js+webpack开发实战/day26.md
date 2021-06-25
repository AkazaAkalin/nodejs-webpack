# 多页面应用脚手架

多页面开发的问题

+ 公共CSS/JS/如何管理
+ 如何将CSS、图片、js部署到CDN上
+ 兼容问题
+ 多人协作如何开发
+ 图片资源压缩

## 项目结构

针对上述问题的解决：
1. 模块化/CDN 通过webpack处理
2. 兼容性问题通过PostCSS处理
3. JavaScript 新语法问题通过babel处理
4. 图片通过image-webpack-loader来处理

### 脚手架的结构
```
{
    build,
    src: {
        common: {
            css,
            js
        },
        images,
        pages: {
            home: {
                home.html,
                home.css,
                html.js
            },
            news: {
                ...
            },

        }
    },
    package.json,
    .babelrc,
    node_modules,
    postcss.config.js
    webpack.config.js
}
```

# 发开步骤
