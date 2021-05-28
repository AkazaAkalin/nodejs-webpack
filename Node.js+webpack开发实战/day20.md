1. # commonJS
   ```
    // function sum(a,b) {
    //     return a+b
    // }
    // exports.sum = sum

    // const sum = require('./math').sum
   ```
同步加载 随用随引

2. # AMD
   ```
   define
   require
   ```
异步加载 需要引用支持库才可使用

3. # CMD
   ```
   /** AMD写法 **/
   define(["a", "b", "c", "d", "e", "f"], function(a, b, c, d, e, f) { 
      // 等于在最前面声明并初始化了要用到的所有模块
      a.doSomething();
      if (false) {
         // 即便没用到某个模块 b，但 b 还是提前执行了
         b.doSomething()
      } 
   });

   /** CMD写法 **/
   define(function(require, exports, module) {
      var a = require('./a'); //在需要时申明
      a.doSomething();
      if (false) {
         var b = require('./b');
         b.doSomething();
      }
   });
   ```
AMD 加载前置 提前加载，
CMD 加载后置，按需加载

4. # requireJs
   
   为了避免出现多和sprit标签引入使用requireJs 进行统筹
   ```
   /** 网页中引入require.js及main.js **/
   <script src="js/require.js" data-main="js/main"></script>

   /** main.js 入口文件/主模块 **/
   // 首先用config()指定各模块路径和引用名
   require.config({
      baseUrl: "js/lib",
      paths: {
         "jquery": "jquery.min",  //实际路径为js/lib/jquery.min.js
         "underscore": "underscore.min",
      }
   });
   // 执行基本操作
   require(["jquery","underscore"],function($,_){
      // some code here
   });``

   ```
   ```
   // 定义math.js模块
   define(function () {
      var basicNum = 0;
      var add = function (x, y) {
         return x + y;
      };
      return {
         add: add,
         basicNum :basicNum
      };
   });
   // 定义一个依赖underscore.js的模块
   define(['underscore'],function(_){
      var classify = function(list){
         _.countBy(list,function(num){
            return num > 30 ? 'old' : 'young';
         })
      };
      return {
         classify :classify
      };
   })

   // 引用模块，将模块放在[]内
   require(['jquery', 'math'],function($, math){
      var sum = math.add(10,20);
      $("#sum").html(sum);
   });
   ```
   在index.js 下使用require统一引用多个module, require的配置项根据文档来配置
5. # ES6模块化写法
   ```
   import {} from xxx

   export function xx () {

   }
   ```
6. # ES6 模块与 CommonJS 模块的差异
   ## 1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
      CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
      ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

   ## 2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
      运行时加载: CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。

      编译时加载: ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import时采用静态命令的形式。即在import时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”。

      CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。
