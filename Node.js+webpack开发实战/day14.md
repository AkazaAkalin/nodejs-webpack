# mongoDB

## 1. 安装，配置环境
## 2. 连接数据库 
## 3. 常用操作

mongo 启动数据库
+ 创建、选择库

    use NAME // NAME是选择要使用的库
+ 删除库
  
    db.dropDatabase() 
+ 创建集合

    db.createCollection(name,[,options])
+ 查看集合

    show collections
+ 删除集合
  
    db.COLLECTION.drop()
+ 索引

    db.COLLECTION.createIndex
+ 插入文档

    db.COLLECTION.insert(DOCUMENT)
+ 更新文档

    db.COLLECTION.update(query, update[, options])
+ 删除文档
    
    db.COLLECTION.remove()
+ 查看文档
  
  db.COLLECTION.find(query,[,projection]) projection 查找指定的键，默认返回所有键，设置projection可以返回指定的键

其他查询语法
+ db.COLLECTION.find(query[,projection]).limit(LIMIT).skip(SKIP)
  LIMIT 返回数量，SKIP跳过的数量


+ db.COLLECTION.count(query)
查询文档数量

+ db.COLLECTION.find().sort(SORT)
排序

# node.js 集成

## schema
 ```
 // Schema 
const schema = new Schema({
    //字段名： 字段类型
})
const schema = new Schema({
    //字段名： 选项
})
// 字段类型支持String Boolean Number Date Object Array
// 选项支持类型 type, default, index(background, unique) required, unique, min, max

const Post = new Schema({
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    create_at: {type: String, default: new Date(), index: {background: false, unique: false}},
    tag: [String],
    published: Boolean,
    meta: {
        praise: Number,
        comment: Number
    }
})
 ```
## Model 

Model 通过Schema 创建，来和数据交互

### 1. 插入数据
save create insertMany 
```
// const news = new Model({
//     title: 'nodeJs',
//     content: "nodejs content"
// })
// news.save()

// Model.create({
//     title: 'nodejs model.create',
//     content: 'Node.js content'
// })

// Model.insertMany([{
//     title: 'nodejs insert 1',
//     content: 'nodejs content 1'
// },{
//     title: 'nodejs insert 2',
//     content: 'nodejs content 2'
// }])

// Model.create([{
//     title: 'nodejs create 1',
//     content: 'nodejs content 1'
// },{
//     title: 'nodejs create 2',
//     content: 'nodejs content 2'
// }])
```
### 2. 查询数据
```
// const news = Model.findOne({title: 'nodejs'})
// const news = Model.findById('111111111111111')
// const news = Mddel.find().ship(1).limit(5)
```
### 3. 更新文档
```
// Model.updateOne(query, update)
// Model.updateMany(query, update)
```
### 4. 删除文档
```
// Model.deteleOne(query)
// Model.deleteMany(query)
```

