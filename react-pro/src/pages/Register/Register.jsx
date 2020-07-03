import React, { Component } from 'react'
import { NavBar, WingBlank, List, InputItem, WhiteSpace, Radio, Button } from 'antd-mobile'
import Logo from "../../components/logo/Logo"
import { connect } from "react-redux"
import { register } from '../../redux/actions'
import { Redirect } from "react-router-dom"

/* 
注册路由组件
*/
const ListItem = List.Item;

class Register extends Component {
    state = {
        username: "",//用户名
        password: "",//密码
        commitpassword: "",//确认密码
        sex: "man"//用户性别
    }
    //点击注册调用
    Register = () => {
        this.props.register(this.state)

    }
    toLogin = () => {
        this.props.history.replace("/login")
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
                        <InputItem type="password" placeholder="确认你的密码" onChange={val => { this.handleChange('commitpassword', val) }}>确认密码:</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <ListItem><span>性别类型:</span>&nbsp;<Radio onChange={() => this.handleChange("sex", "man")} checked={this.state.sex === 'man'}>男</Radio>&nbsp;
                        <Radio onChange={() => this.handleChange("sex", "women")} checked={this.state.sex === 'women'}>女</Radio></ListItem>
                        <WhiteSpace></WhiteSpace>
                        <Button type="primary" onClick={this.Register}>注册</Button>
                        <WhiteSpace />
                        <Button onClick={this.toLogin}>已有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(state => ({ user: state.user }), { register })(Register)