const { Mongoose, Schema, Model } = require('mongoose')
const mongoose = new Mongoose()
const connect = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/blog',
        { useNewUrlParser: true, useUnifiedTopology: true} )
        console.log('connected ~')
    } catch(e) {
        console.log(e, 'disconnected')
    }
}
connect()
// Schema 
/*
    const schema = new Schema({
        //字段名： 字段类型
    })
    const schema = new Schema({
        //字段名： 选项
    })
*/
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
Post.static.new = function (data) {
    return new Model(data)
}
const Model = mongoose.model('Post', Post)
const data = Model.new()
console.log(data)

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


// const news = Model.findOne({title: 'nodejs'})
// const news = Model.findById('111111111111111')
// const news = Mddel.find().ship(1).limit(5)

// Model.updateOne(query, update)
// Model.updateMany(query, update)

// Model.deteleOne(query)
// Model.deleteMany(query)