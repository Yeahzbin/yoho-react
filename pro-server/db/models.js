/*
包含n个操作数据库集合数据的model模块
*/
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/chaowan', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.once("open", () => {
    console.log('数据库链接成功');
})
db.on("error", (error) => {
    console.log("数据库链接失败" + error);
})
const userSchema = mongoose.Schema({
    username: { type: String, require: true },//用户名
    password: { type: String, require: true },//密码
    sex: { type: String, require: true },//性别
    header: { type: String },//头像
    brand: { type: String },//品牌
    info: { type: String },//个人简介
    interest: { type: String },//爱好
    salary: { type: String }//工资
})
const chatSchema = mongoose.Schema({
    from: { type: String, require: true },//发送用户的id
    to: { type: String, require: true },//接收用户的id
    chat_id: { type: String, require: true },//from和to组成的字符串
    content: { type: String, require: true },//内容
    read: { type: Boolean, default: false },//标识是否已读
    create_time: { type: Number }//创建时间
})
//定义聊天model ，操作集合
const ChatModel = mongoose.model("chat", chatSchema)
//定义用户model ，操作集合
const UserModel = mongoose.model("user", userSchema)
//暴露用户model
exports.UserModel = UserModel//
//暴露聊天model
exports.ChatModel = ChatModel//