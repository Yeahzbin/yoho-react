import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Maninfo from "../man_info/Maninfo"
import Womeninfo from "../women_info/Womeninfo"
import { connect } from 'react-redux'
import Cookies from "js-cookie"
import { getUser } from "../../redux/actions"
import { getRedirectTo } from "../../js/index"
import Man from "../man/Man"
import Women from "../women/Women"
import Message from "../message/Message"
import Personal from "../personal/Personal"
import Chat from "../Chat/Chat"
import Notfound from "../../components/not-found/Notfound"
import { NavBar } from 'antd-mobile'
import Navfooter from "../../components/nav_footer/Navfooter"
class Main extends Component {
    //给组件对象添加属性,包含所有组件导航组件的内容
    navList = [
        {
            path: "/man",//路径
            title: "男生列表",//顶部标题
            icon: "dashen",//底部图标
            text: "男生",//图标文字
            component: Man,//对应组件
        },
        {
            path: "/women",
            title: "女生列表",
            icon: "laoban",
            text: "女生",
            component: Women
        },
        {
            path: "/message",
            title: "消息列表",
            icon: "message",
            text: "message",
            component: Message
        },
        {

            path: "/personal",
            title: "个人中心",
            icon: "personal",
            text: "个人",
            component: Personal
        }
    ]
    componentDidMount() {
        //登录过cookie中有userid，但redux中没有user，需要发请求获取相应的user
        const userid = Cookies.get("userid")

        if (userid && !this.props.user._id) {
            //发送异步请求，获取user
            this.props.getUser()
        }
    }
    render() {
        //查看cookie中的userid
        const userid = Cookies.get('userid')
        //如果没有，重定向到登录界面
        if (!userid) {
            return <Redirect to="/login"></Redirect>
        }
        //如果有，读取redux中的user

        //如果没有redux，有cookie，返回null（不做任何显示）
        if (!this.props.user._id) {
            return null
        } else {
            //如果有_id,显示对应的界面     
            //根据user的sex和header来计算出一个重定向的路由路径，并自动重定向
            let path = this.props.location.pathname
            if (path === "/") {
                path = getRedirectTo(this.props.user.sex, this.props.user.header)
                return <Redirect to={path}></Redirect>
            }
        }

        const { navList } = this
        const path = this.props.location.pathname
        const currentNav = navList.find(nav => nav.path === path)
        if (currentNav) {
            //决定哪个路由需要隐藏
            if (this.props.user.sex === "women") {
                //隐藏男生，数组第一个
                this.navList[0].hide = true
            } else {
                //隐藏数组第二个
                this.navList[1].hide = true
            }
        }
        return (
            <div>
                {currentNav ? <NavBar>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        navList.map(nav => <Route path={nav.path} key={nav.path} component={nav.component}></Route>)
                    }
                    <Route path="/maninfo" component={Maninfo}></Route>
                    <Route path="/womeninfo" component={Womeninfo}></Route>
                    <Route path="/chat/:userid" component={Chat}></Route>
                    <Route component={Notfound}></Route>
                </Switch>
                {currentNav ? <Navfooter navList={navList}></Navfooter> : null}
            </div>
        )
    }
}
export default connect(state => ({ user: state.user }), { getUser })(Main)
/*
一 自动登录
1. 如果cookie中有userid，发请求获取对应的user
2.如果cookie中没有userid，自动进入login界面

二 如果登录了
 根据user的sex和user来重定向路由路径


*/