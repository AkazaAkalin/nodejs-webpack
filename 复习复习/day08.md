# JS事件
```
console.log('script start')
 setTimeout(() => {
     console.log('setTimeout1');
     Promise.resolve().then(() => {
          console.log('promise1')
    })
}, 0)

 new Promise(resolve => {
    console.log('promise2');
    setTimeout(() => {
        console.log('setTimeout2');
        resolve();
    }, 0)
 })

 Promise.resolve().then(() => {
     console.log('promise3');
     setTimeout(() => {
          console.log('setTimeout3')
    },0)
 }).then(() => console.log('promise4'))
 console.log('scriptend');
``` 
start promise2 scriptend promise3 promise4 setTimeout1 promise1 setTimeout2 setTimeout3
 
## promise.then 在异步中执行会优先于settimeout
