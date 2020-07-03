import React, { Component } from 'react'
import { NavBar, WingBlank, List, InputItem, WhiteSpace, Radio, Button } from 'antd-mobile'
import Logo from "../../components/logo/Logo"
import { connect } from "react-redux"
import { login } from '../../redux/actions'
import { Redirect } from "react-router-dom"
/* 
注册路由组件
*/
const ListItem = List.Item;

class Login extends Component {
    state = {
        username: "",//用户名
        password: ""//密码
    }
    Login = () => {
        this.props.login(this.state)
    }
    toRegister = (sda) => {
        this.props.history.replace("/register")
        console.log(sda);

    }
    //处理输入数据的改变：更新对应的状态
    handleChange = (name, val) => {
        this.setState({
            [name]: val //属性名是变量，使用中括号括住
        })
    }
    render() {
        const { msg, redirectTo } = this.props.user
        //如果重定向有值，重定向指定的路由
        if (redirectTo) {
            return <Redirect to={redirectTo}></Redirect>//不执行下面代码
        }
        return (
            <div>
                <NavBar mode="dark"
                >Yoho&nbsp;潮玩</NavBar>
                <WhiteSpace></WhiteSpace>
                <Logo></Logo>
                <WhiteSpace></WhiteSpace>
                <WingBlank>
                    <List>
                        {msg ? <div className="error-msg">{msg}</div> : null}
                        <WhiteSpace></WhiteSpace>
                        <InputItem type="text" placeholder="请输入你的用户名" onChange={val => { this.handleChange('username', val) }}>用户名:</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem type="password" placeholder="请输入你的密码" onChange={val => { this.handleChange('password', val) }}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <Button type="primary" onClick={this.Login}>登录
                        </Button>
                        <WhiteSpace />
                        <Button onClick={this.toRegister}>注册</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(state => ({ user: state.user }), { login })(Login)