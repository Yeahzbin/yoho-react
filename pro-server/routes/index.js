var express = require('express');
var router = express.Router();
const md5 = require('blueimp-md5')
const { UserModel, ChatModel } = require('../db/models')//拿到模型对象
const filter = { password: 0, __v: 0 }//指定过滤的属性
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
//注册路由
router.post("/register", (req, res, next) => {
  //获取请求参数
  const { username, password, sex } = req.body
  //处理
  //判断用户是否存在，如果存在返回错误的信息
  UserModel.findOne({ username }, (error, userdoc) => {
    if (userdoc) {
      //存在此用户，返回错误信息
      res.send({ code: 1, msg: "存在此用户" })
    } else {
      //不存在此用户,可以保存数据
      new UserModel({ username, password: md5(password), sex }).save((error, userdoc) => {
        const data = { username, sex, _id: userdoc._id }//将密码去掉
        res.cookie("userid", userdoc._id, { maxAge: 1000 * 60 * 60 * 24 })//持久化coolie，永久保留，毫秒为单位
        res.send({ code: 0, data })
      })
    }
  })
})
//登录路由
router.post("/login", (req, res) => {
  const { username, password } = req.body
  //查询用户是否存在,如果没有提示登录错误，如果有返回登录成功，加上用户数据
  UserModel.findOne({ username, password: md5(password) }, filter, (err, user) => {
    if (user) {
      //登录成功
      res.cookie("userid", user._id, { maxAge: 1000 * 60 * 60 * 24 })
      res.send({ code: 0, data: user })
    } else {
      //登录失败
      res.send({ code: 1, msg: "用户名或者密码不正确！" })
    }
  })
})
//更新用户信息的路由
router.post("/update", (req, res) => {
  //得到浏览器的cookie上存储的id
  const userid = req.cookies.userid;
  //如果不存在，直接返回提示信息结果
  if (!userid) {
    res.send({ code: 1, msg: '清先登录' })//用return结束函数执行
  } else {
    //存在，根据userid更新对应的user数据库
    //得到提交的用户数据
    const user = req.body
    UserModel.findByIdAndUpdate({ _id: userid }, user, (error, oldData) => {
      if (!oldData) {
        //说明cookie的数据是错误数据，删除浏览器的cookie
        res.clearCookie('userid')
        res.send({ code: 1, msg: "请先登录" })
      } else {
        //准备一个返回的user数据对象
        const { _id, username, sex } = oldData
        const data = Object.assign({ _id, username, sex }, user)
        res.send({ code: 0, data })
      }
    })
  }


})
//获取用户信息的路由
router.get('/user', (req, res) => {
  //请求的cookie的得到userid
  const userid = req.cookies.userid
  if (!userid) {
    return res.send({ code: 1, msg: "请先登录" })
  }
  UserModel.findOne({ _id: userid }, filter, (error, user) => {
    res.send({ code: 0, data: user })
  })
})
router.get("/userlist", (req, res) => {
  const { sex } = req.query
  UserModel.find({ sex }, filter, function (err, users) {
    res.send({ code: 0, data: users })
  })
})
//获取当前用户所有聊天信息列表
router.get("/msglist", (req, res) => {
  //获取cookie中的用户id
  const userid = req.cookies.userid
  //根据用户id查询用户信息
  UserModel.find(function (err, userDocs) {
    //用对象储存所有user信息
    // const users = {};
    // userDocs.forEach(val => { users[val._id] = { username: val.username, header: val.header } })
    const users = userDocs.reduce((users, user) => {
      users[user._id] = { username: user.username, header: user.header }
      return users
    }, {})
    /* 
    查询userid相关的所有聊天信息
    参数1：查询条件
    参数2：过滤条件
    参数3：回调函数
    */
    ChatModel.find({ '$or': [{ from: userid }, { to: userid }] }, filter, function (err, chatMsgs) {
      res.send({ code: 0, data: { users, chatMsgs } })
    })
  })
})
/* 
修改指定消息是否已读
*/
router.post('/readmsg', function (req, res) {
  //得到请求中的from与to
  const from = req.body.from
  const to = req.cookies.userid
  
  /* 
  更新数据库中的chat数据
  参数1：查询条件
  参数2：更新为指定的数据对象
  参数3：是否1次更新多条，默认只更新一条
  参数4：更新完成的回调函数
  */
  //mu;ti:true 执行多条的更新,默认更新一条
  ChatModel.update({ from, to, read: false }, { read: true }, { multi: true }, function (err, doc) {
    console.log('/readmsg', doc);
    res.send({ code: 0, data: doc.nModified })//发送更新的数量
  })
})
module.exports = router;
