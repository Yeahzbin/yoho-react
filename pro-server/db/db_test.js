//引入mongoose模块
const mongoose = require('mongoose');
//引入加密模块
const md5 = require('blueimp-md5');
//链接指定数据库,固定格式,url最后一个为创建数据库的名字
mongoose.connect();
//获取链接对象，用来监听
const db = mongoose.connection;
//监听4000端口，判断是否开启成功
db.on('open', () => {
    console.log("数据链接成功.....");
})
db.on("error", (error) => {
    console.log("数据库链接失败" + error);
})
//mongodb里面分为集合与文档，集合（数组）里有很多文档（对象类型），集合名称有s结尾，一条数据是一条记录也文档，表就是集合
//指定文档的结构
const userSchema = mongoose.Schema({
    /* 
    属性名/属性值，默认值，是否必须
    */
    username: { type: String, require: true },
    password: { type: String, require: true },
    type: { type: String, require: true },
    header: { type: String }
})
//得到特定集合的Model,用来操作集合
const UesrModel = mongoose.model("user", userSchema)//集合名：users，所以里面去掉s
//通过model创建实例save（）添加数据
function testSave() {
    const userModel = new UesrModel({ username: 'Yee', password: md5('456'), type: "laoban" })
    //调用save()，保存数据
    userModel.save((error, userDoc) => {
        console.log('save', error, userDoc);

    })
}
function
testSave()