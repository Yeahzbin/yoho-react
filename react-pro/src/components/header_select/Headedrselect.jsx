/*
选择用户头像UI的组件

*/
import React, { Component } from 'react'
import { List, Grid } from "antd-mobile"
import PropsTypes from "prop-types"
export default class Headedrselect extends Component {
    static PropsTypes = {
        setHeader: PropsTypes.func.isRequired
    }
    state = {
        icon: null//图片对象
    }
    constructor(props) {
        super(props)
        this.headerList = []
        for (let i = 0; i < 20; i++) {
            this.headerList.push({
                text: "头像" + (i + 1),
                icon: require(`../../assets/images/头像${i + 1}.png`)
            })
        }
    }
    handleClick = ({ text, icon }) => {
        //更新组件状态
        this.setState({
            icon
        })
        //调用父组件的传递函数，并给text的值
        this.props.setHeader(text)
    }
    render() {

        const listHeader = !this.state.icon ? "请选择头像" : (
            <div>已选择头像：<img src={this.state.icon} alt="" /></div>
        )

        return (
            <div>
                <List renderHeader={() => listHeader}>
                    <Grid data={this.headerList} columnNum={5} onClick={this.handleClick}></Grid>
                </List>
            </div >
        )
    }
}
