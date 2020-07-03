import React, { Component } from 'react'
import { Button } from "antd-mobile"
export default class Notfound extends Component {
    render() {
        return (
            <div>
                <div>
                    <h2>抱歉找不到该页面</h2>
                    <Button type="primary" onClick={() => { this.props.history.replace("/") }}>返回首页</Button>
                </div>
            </div>
        )
    }
}
