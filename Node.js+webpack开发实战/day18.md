# 模型使用

## 插入一条数据和批量插入数据

```
async function example1() {
    try {
        await sequelize.sync({force: true})
        const user = await User.create({
            username: 'guohua',
            password: '000000'
        })
        console.log('create success,',  user.toJSON())
    } catch(e) {
        console.log(e)
    }
}
async function example2() {
    try {
        await sequelize.sync({force: true})
        const users = await User.bulkCreate([
            {username: 'guohua', password: 123456},
            {username:'jojo', password: 111111}
        ], {
            individualHooks: true // 对每个数据分别执行一次生命周期
        })
        console.log('create success', users.map(user => user.toJSON()))
    } catch(e) {
        console.log(e)
    }
}
```

## 更新数据

```
async function update1() {
    try {
        const [count] = await User.update({password: 'qweasd'}, {
            where: {
                username: 'jojo'
            },
            individualHooks: true,
        })
        console.log(`update ${count} data`)
    } catch(e) {
        console.log(e)
    }
}
async function update2() {
    try {
        const user = await User.findOne({
            where: {
                username: 'user1'
            },

        })
        if(!user) {
            throw new Error('user not exist');
            return
        }
        user.password = '654321'
        await user.save()
        console.log(user.toJSON(), 'save success')
    } catch(e) {
        console.log(e)
    }
}
```

## 删除
```
// async function delete1() {
//     try {
//         const count = await User.destroy({
//             where: {
//                 username: 'jojo'
//             }
//         })
//         console.log(count ,' has been deleted')
//     } catch(e) {
//         console.log(e)
//     } 
// }
// async function delete2() {
//     try {
//         const user = await User.findOne({
//             where: {
//                 username: 'jojo'
//             }
//         })
//         if(user) {
//             await user.destroy()
//             console.log('delete success')
//         } else {
//             console.log('delete fail')
//         }
//     } catch(e) {
//         console.log(e)
//     }
// }
// async function softDelete() {
//     try {
//         const user = await User.findOne({
//             username: 'jojo'
//         })
//         if(!user) {
//             throw new Error('user not exist')            
//         } else {
//             user.destroy({force: true})
//             console.log('delete success')
//         }
//     } catch(e) {
//         console.log(e)
//     }
// }
// delete1()
// delete2()
// softDelete()
```
## 查询
1.  findByPK // 根据主键查询
2.  findOne
```
async function find() {
    const user = await User.findOne({
        attributes: ['username', 'password'],
        where: {
            username: 'jojo'
        }
    })
    console.log(user? user.toJSON(): 'not fonud')
}
find() // { username: 'jojo', password: '0' }
```
3. findAll
```
async function findAll() {
    const users = await User.findAll({
        where: {
            password: 000000
        },
        order: [
            // ['status', 'DESC'],
            ['id', 'ASC']
        ],
        // offset: 10, // 分页 
        limit: 10 // 限制行数
    })
    console.log(users)
}
findAll()
```
4. findOrCreate 查询 如果没有查询到数据就创建一个数据
```
async function findOrCreate() {
    const [user, create] = await User.findOrCreate({
        where: {
            username: 'faker'
        },
        defaults: {
            username: 'faker',
            password: '88888888'
        }
    })
    if(create) {
        console.log(user, 'create')
    } else {
        console.log(create, 'user')
    }
}
findOrCreate()
```
5. findAndCountAll 
   
   User.findAndCountAll({where: //})
6. count

