// function once(fun, reason) {
//     var done = false
//     return function(n) {
//         if(!done) {
//             // fun.apply(this,[].slice.call(arguments))
//             fun(n)
//             done = true
//         } else {
//             console.log(reason)
//         }
//     }
// }
// let pay = once(function(n) {
//     console.log('支付了'+n+'元')
// }, 'donedonedone')
// pay(100)
// pay(1000)

let o1 = {
    a: 1
};
let o2 = {
    a: 2
};
let o3 = {
    a: 3
};

function fn(b, c) {
    console.log(this.a + (b||0) + (c||0) );
};

let fn1 = fn.bind(o1, 2, 3);
let fn2 = fn1.bind(o2);
let fn3 = fn2.bind(o3);
fn3()
fn1(4,4)
fn1.apply(o2)