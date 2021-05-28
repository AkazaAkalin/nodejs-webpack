const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 3306,
    username: 'root',
    password: '',
    database: 'test',
    timezone: '+08:00',
    pool: {
        max: 10,
        min: 0
    },
    logging: false
})

class User extends Model {
    getFullname() {
        return this.lastname + this.firstname
    }
    static checkName(name) {
        return true
    }
 }
User.init({
    id: {
        type: DataTypes.INTEGER({unsigned: true}), 
        primaryKey: true,
        autoIncrement: true,
        comment: '用户ID' 
    },
    username: {
        type: DataTypes.STRING(40),
        allowNull: false,
        comment: '用户名'
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '用户密码'
    },
    // mobile: {
    //     type: DataTypes.INTEGER(11),
    //     allowNull: false,
    //     validate: {
    //         validateMobile(value) {
    //             if( value == null ) {
    //                 return
    //             } 
    //             if(!/^1[3-9]\d{9}$/.test(value)) {
    //                 throw new Error(' mobile validate fail ')
    //             }
    //         } 
    //     }
    // },
    // firstname: {
    //     type: DataTypes.STRING(10),
    //     allowNull: false,
    //     validate: {
    //         notEmpty: {
    //             msg: '不能为空'
    //         }
    //     }
    // },
    // lastname: {
    //     type: DataTypes.STRING(10),
    //     allowNull: false,
    //     validate: {
    //         notEmpty: {
    //             msg: '不能为空'
    //         }
    //     }
    // },
    // status: {
    //     type: DataTypes.TINYINT,
    //     allowNull: false,
    // }
}, { 
    sequelize: sequelize, 
    tableName: 'user', 
    modelName:'user',
    // paranoid: true,
    // underscored: true,
    // hooks: {
    //     beforeSave: (user => {
    //         if(user.changed('password')) {
    //             // user.password = crypto.createHash('sha256').update(user.password).digest('hex')
    //             // user.password = 'aaaa'
    //             // console.log(user, 'beforeSave')
    //         }
    //     })
    // }, 
    // indexes: {
    //     name:   'index_name_status',
    //     unique: false,
    //     fields: ['username', 'status']
    // }
})

// sequelize.sync({force: true}).then(()=> {
//     return User.create({
//         username: 'user1',
//         password: 123456
//     })

// }).then((user)=> {
//     console.log(user.toJSON())
// }).catch(err => {
//     console.log(err)
// })




// User.findByPk(1).then((user) => {
    //     user.password = 'password'
//     return user.save()
// }).then(user => {
//     console.log(user.toJSON())
// })


// User.create({
//     username: 'test',
//     password: '123456',
//     mobile: 15045811575
// }).then((user) => {
//     console.log(user.toJSON())
// }).catch(err => {
//     console.error(err)
// })


// async function example1() {
//     try {
//         await sequelize.sync({force: true})
//         const user = await User.create({
//             username: 'guohua',
//             password: '000000'
//         })
//         console.log('create success,',  user.toJSON())
//     } catch(e) {
//         console.log(e)
//     }
// }
// async function example2() {
//     try {
//         await sequelize.sync({force: true})
//         const users = await User.bulkCreate([
//             {username: 'guohua', password: 123456},
//             {username:'jojo', password: 111111}
//         ], {
//             individualHooks: true // 对每个数据分别执行一次生命周期
//         })
//         console.log('create success', users.map(user => user.toJSON()))
//     } catch(e) {
//         console.log(e)
//     }
// }

// example1()

// example2()

// async function update1() {
//     try {
//         const [count] = await User.update({password: 'qweasd'}, {
//             where: {
//                 username: 'jojo'
//             },
//             individualHooks: true,
//         })
//         console.log(`update ${count} data`)
//     } catch(e) {
//         console.log(e)
//     }
// }
// async function update2() {
//     try {
//         const user = await User.findOne({
//             where: {
//                 username: 'user1'
//             },

//         })
//         if(!user) {
//             throw new Error('user not exist');
//             return
//         }
//         user.password = '654321'
//         await user.save()
//         console.log(user.toJSON(), 'save success')
//     } catch(e) {
//         console.log(e)
//     }
// }
// update1();
// update2();

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

// async function find() {
//     const user = await User.findOne({
//         attributes: ['username', 'password'],
//         where: {
//             username: 'jojo'
//         }
//     })
//     console.log(user? user.toJSON(): 'not fonud')
// }
// find() // { username: 'jojo', password: '0' }

// async function findAll() {
//     const users = await User.findAll({
//         where: {
//             password: 000000
//         },
//         order: [
//             // ['status', 'DESC'],
//             ['id', 'ASC']
//         ],
//         // offset: 10, // 分页 
//         limit: 10 // 限制行数
//     })
//     console.log(users)
// }
// findAll()


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
