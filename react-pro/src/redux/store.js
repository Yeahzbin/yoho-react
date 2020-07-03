/*
redux核心管理状态的对象

*/
import { createStore, applyMiddleware } from 'redux'//引入创建函数
import thunk from 'redux-thunk'
import reducers from "./reducers"
import { composeWithDevTools } from 'redux-devtools-extension'
export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))//暴露store，第一参数reducers