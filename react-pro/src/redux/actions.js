/* 
包含n个action creator，异步action或同步action
*/

//注册action
import { reqRegister, reqLogin, reqUpdateUser, reqUser, reqUserList, reqMsgList } from "../api/index"
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USERLIST, RECEIVE_MSG_LIST, RECEIVE_MSG } from "./action-type"
import io from 'socket.io-client'
//授权成功的同步action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
//错误提示信息的同步action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
//接收用户的同步action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
// 重置用户的同步action
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })
//接收消息列表的同步action
const receiveMsgList = ({ users, chatMsgs }) => ({ type: RECEIVE_MSG_LIST, data: { users, chatMsgs } })
//接收用户列表的同步action
const receiveUserList = (userList) => ({ type: RECEIVE_USERLIST, data: userList })
//发送信息的同步action
const receiveMsg = (chatMsg) => ({ type: RECEIVE_MSG, data: chatMsg })
function initIO(dispatch, userid) {
    // 1. 创建对象之前: 判断对象是否已经存在, 只有不存在才去创建
    if (!io.socket) {
        // 连接服务器, 得到与服务器的连接对象
        io.socket = io('ws://localhost:4000')  // 2. 创建对象之后: 保存对象
        // 绑定监听, 接收服务器发送的消息
        io.socket.on('receiveMsg', function (chatMsg) {
            console.log('客户端接收服务器发送的消息', chatMsg)
            // 只有当chatMsg是与当前用户相关的消息, 才去分发同步action保存消息
            // debugger
            if (userid === chatMsg.from || userid === chatMsg.to) {
                dispatch(receiveMsg(chatMsg))
            }
        })

    }
}

// 异步获取消息列表数据
async function getMsgList(dispatch, userid) {
    initIO(dispatch, userid)
    const response = await reqMsgList()
    const result = response.data
    if (result.code === 0) {
        const { users, chatMsgs } = result.data
        // 分发同步action
        dispatch(receiveMsgList({ users, chatMsgs }))
    }
}

//异步注册action
export const register = (user) => {
    const { username, password, commitpassword, sex } = user
    //做表单的前台检查，如果不通过，返回一个errorMsg的同步action
    if (!username) {
        return errorMsg('用户名必须要有！')
    } else if (password !== commitpassword) {
        return errorMsg('2次密码要一致')
    }
    return async  dispatch => {
        //发送注册的请求
        const response = await reqRegister({ username, password, sex })


        const result = response.data


        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            //注册成功
            //分发成功的同步action
            dispatch(authSuccess(result.data))
        } else {
            //注册失败
            //分发错误的同步action
            dispatch(errorMsg(result.msg))
        }
    }
}
//登录异步action
export const login = (user) => {
    const { username, password } = user
    //做表单的前台检查，如果不通过，返回一个errorMsg的同步action

    if (!username) {
        return errorMsg('用户名必须要有！')
    } else if (!password) {
        return errorMsg('密码必须要填')
    }
    return async dispatch => {
        //发送登录请求
        const response = await reqLogin(user)

        const result = response.data
        if (result.code === 0) {
            //登录成功
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))
        } else {
            //登录失败
            dispatch(errorMsg(result.msg))
        }
    }
}
//异步更新用户信息action
export const updateUser = (user) => {


    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data

        if (result.code === 0) {
            //更新成功
            dispatch(receiveUser(result.data))
        } else {
            //更新失败
            dispatch(resetUser(result.msg))
        }
    }
}
//异步获取用户信息action
export const getUser = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}
//异步获取用户列表action
export const getUserList = (sex) => {
    return async dispatch => {
        const response = await reqUserList(sex)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUserList(result.data))
        }
    }
}
//异步发送消息的action
export const sendMsg = ({ from, to, content }) => {
    return dispatch => {
        console.log('客户端发给后端的数据', { from, to, content });
        //全局发消息
        io.socket.emit('sendMsg', { from, to, content })
    }
}