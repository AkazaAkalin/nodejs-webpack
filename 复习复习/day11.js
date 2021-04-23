function _new() {
    let constructorFn = [].shift.call(arguments)
    let obj = {}
    obj.__proto__ = constructorFn.prototype
    constructorFn.call(obj, arguments)
    return obj
}
let key = Symbol('id') 
let o = {
    name: 'aa',
    [key]: '1',
    [Symbol('time')]:Date.now()
}
console.log(o,Object.getOwnPropertySymbols(o),o.name, o[key])
// function(context, param) {
//     let context = context || window
//     let fn = Symbol('symbolfn')
//     context[fn]() 
// }
Function.prototype._bind = function() {
    let self = this
    let contenxt = [].shift.call(arguments)
}