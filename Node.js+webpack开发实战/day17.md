# 模型方法
```
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
    firstname: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: '不能为空'
            }
        }
    },
    lastname: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: '不能为空'
            }
        }
    }
}, { 
    sequelize: sequelize, 
    tableName: 'user', 
    modelName:'user',
    // paranoid: true,
    // underscored: true,
    hooks: {
        beforeSave: (user => {
            if(user.changed('password')) {
                // user.password = crypto.createHash('sha256').update(user.password).digest('hex')
                // user.password = 'aaaa'
                // console.log(user, 'beforeSave')
            }
        })
    }
})

sequelize.sync({force: true}).then(()=> {
    return User.create({
        firstname: 'guoo',
        lastname: 'huaa'
    })

}).then((user)=> {
    console.log(user.getFullname())
}).catch(err => {
    console.log(err)
})
``` 