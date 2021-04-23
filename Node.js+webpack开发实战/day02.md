# module 和 exports
可以理解为
```
var exports = module.exports
```
因此 exports.xx 就是 module.exports.xx
而exports = xx 改变了他的指向

# commen JS 规定下的require

require 导入一个对象，这个对象是 module.exports导出的

## 加载规则
1.  '/'绝对路径
2.  './'相对路径
3.  以上两者都不是就去当前的node_modules模块下寻找
4.  如果没有找到路径，nodeJS会按照自动添加(.js,.json, .node)
5.  如果传入的参数是一个目录，NodeJS会读取当前package.json中的文件，根据main来加载真正的入口文件。如果没有main就加载index.js
