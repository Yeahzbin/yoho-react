import React, { Component } from 'react'
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { updateUser } from "../../redux/actions"
import { NavBar, InputItem, TextareaItem, Button, WingBlank } from "antd-mobile"
import Headerselect from "../../components/header_select/Headedrselect"

class Womeninfo extends Component {
    state = {
        header: "",
        brand: "",
        info: "",
        interest: "",
        salary: ""
    }
    setHeader = (url) => {
        this.setState({
            header: url
        })
    }
    handleChange = (type, val) => {
        this.setState({
            [type]: val
        })
    }
    save = () => {
        this.props.updateUser(this.state)
    }
    render() {//如果信息已经完善
        const { header, sex } = this.props.user
        if (header) {
            const path = sex === "women" ? "/women" : "/man"
            return <Redirect to={path}></Redirect>
        }
        return (
            <div>
                <NavBar>女生区信息完善</NavBar>
                <Headerselect setHeader={this.setHeader}></Headerselect>
                <InputItem placeholder="请输入兴趣爱好" onChange={val => { this.handleChange("interest", val) }}>兴趣爱好:</InputItem>
                <InputItem placeholder="请输入喜爱品牌" onChange={val => { this.handleChange("brand", val) }}>喜爱品牌:</InputItem>
                <InputItem placeholder="月收入" onChange={val => { this.handleChange("salary", val) }}>月收入:</InputItem>
                <TextareaItem title="个人介绍" rows={3} onChange={val => { this.handleChange("info", val) }}></TextareaItem>
                <WingBlank>
                    <Button type="primary" onClick={this.save}>保&nbsp;&nbsp;存</Button>
                </WingBlank>



            </div>
        )
    }
}
export default connect(state => ({ user: state.user }), { updateUser })(Womeninfo)