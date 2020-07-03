/* 
包含了n个接口请求的函数的模块
*/
import ajax from './axios'
export const reqRegister = (user) => ajax('/register', user, 'POST') //请求注册
export const reqLogin = ({ username, password }) => ajax('/login', { username, password }, "POST") //请求登录
export const reqUpdateUser = (user) => ajax("/update", user, "POST") //请求更新
export const reqUser = () => ajax("/user") //获取用户信息
export const reqUserList = (sex) => ajax("/userlist", { sex })//获取对应的用户列表
export const reqMsgList = () => ajax("/msglist")//获取消息列表
export const reqReadMsg = (from) => ajax('/readmsg', { from }, "POST")//修改信息已读