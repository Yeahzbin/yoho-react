/*
包含n个reducer函数，根据老的state和指定的action返回新的state
*/
import { combineReducers } from 'redux'
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USERLIST, RECEIVE_MSG_LIST, RECEIVE_MSG } from './action-type'
import { getRedirectTo } from "../js/index"
const initUser = {
    username: "",//用户
    sex: "",//性别
    msg: "",//错误信息
    redirectTo: ""//指定重定向的路由路径
}
const initUserList = [

]
const initChatList = {
    users: {

    },//聊天中的用户信息对象 
    chatMsgs: [],//当前用户所有相关的数组
    unReadCoount: 0//总的未读数量
}
//产生user状态的reducer
function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const { sex, header } = action.data
            return { ...action.data, redirectTo: getRedirectTo(sex, header) }
        case ERROR_MSG:
            return { ...state, msg: action.data }
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return { ...initUser, msg: action.data }
        default:
            return state
    }
}
//产生userlist状态的reducer
function userList(state = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USERLIST: //data为userList
            return action.data
        default:
            return state
    }
}
//产生chatMsg状态的reducer
function chatList(state = initChatList, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const { users, chatMsgs } = action.data
            return {
                users, chatMsgs, unReadCoount: 0
            }
        case RECEIVE_MSG:
            const chatMsg = action.data
            return { users: state.users, chatMsgs: [...state.chatMsgs, chatMsg], unReadCoount: 0 }
        default:
            return state
    }
}
export default combineReducers({
    user,
    userList,
    chatList
})
//{user:{},userList:[]}
