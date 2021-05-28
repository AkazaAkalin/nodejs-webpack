# 数据库可视化工具
# Sequelize
```
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

class User extends Model { }
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
    }
}, { sequelize: sequelize, tableName: 'user', modelName:'user'})

sequelize.sync().then(()=> {
    return User.create({
        username: 'sequelizeTest',
        password: '1'
    })
}).then((user)=> {
    console.log(user.toJSON())
}).catch(err => {
    console.log(err)
})
```
首先配置数据库的链接，然后用user来继承model 配置字段和模型选项
## 数据类型
sequelize 几乎支持所有数据库的类型
```
DataType.INTRGER({unsigned: true}) // 创建无符号整型
DataType.STRING(40)
DataType.STRING({length: 20, unsigned: true, zerofill: true})
```
## 模型定义
### 字段设置
```
User.init({
    username: DataType.STRING(40)
    id: {
        type : DataType.INTEGER(length: 10, unsigned: true,
        primaryKey: true,
        autoIncrement: true
    )}
})
生成的SQL语句
`username` varchar(40) Default null
`id` int(10) unsigned NOT null auto_increment,
primary key(id)
```
### 模型选项

## HOOKS
生命周期顺序
```
hooks: {
        beforeSave: (user => {
            if(user.changed('password')) {
                // user.password = crypto.createHash('sha256').update(user.password).digest('hex')
                // user.password = 'aaaa'
                console.log(user, 'beforeSave')
            }
        })
    }


User.findByPk(1).then((user) => {
user.password = 'password'
return user.save()
})
```
定义hooks的方式

1. 
```
User.init(properties, {
    hooks: {
        ///
    }
})
```

2.  
 ```
 User.beforeSave(user => {
    //..
 })
 ```
3.  
```
User.addHook('beforeSave', (user, options)=> {

})
addHook接受的生命周期名称是字符串，如果编码错误将不能匹配到对应声明周期中，因此建议使用
```
### 模型验证器
Sequelize内部自动处理的，也可以添加自定义检验
```
User.init({
    email: {
        type: DataType.STRING(40)
        validate: {
            isEmail: true,
            // 自定义检验方法
            isQQmail: function(value) {
                // ..
            }
        }, 
        allowNull: true
    }
})
```
异步验证
有些场景下执行自定义验证是需要异步的，比如说访问数据库或者HTTP接口，要是用async/await

```
status: {
    allNull: false,
    validate: {
        async remoteValidate(value) {
            // httprequest  是返回promise的接口
            let result = await httprequest(value)
            if (result.errcode) {
                throw new Error('states validate fail')
            }
        }
    }
}
```
如果设置了allowNull:fasle, 则优先判断null 如果是null跳过其他验证直接抛出错误

### 自定义验证
```
isEmail : {
    msg: '邮箱格式错误'
}
is: {
    msg: '手机号错误',
    args: /^1[3-9]\d{9}$/
}
```
