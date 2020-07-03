import React, { Component } from 'react'
import { connect } from "react-redux"
import { Result, List, WhiteSpace, Button, Modal } from "antd-mobile"
import Cookies from "js-cookie"
import { resetUser } from "../../redux/actions"
const Item = List.Item
const Brief = Item.Brief
class Personal extends Component {
    Loginout = () => {
        Modal.alert('退出', "确认退出登录吗？", [{ text: "取消" }, {
            text: "确定", onPress: () => {
                //去除cookie的userid
                Cookies.remove('userid')
                //去除redux管理的user
                this.props.resetUser()
            }
        }])
    }
    render() {
        const { username, sex, header, brand, interest, salary } = this.props.user
        return (
            <div style={{ marginTop: 50 }}>
                <Result img={<img src={require(`../../assets/images/${header}.png`)} style={{ width: 50 }} alt="header" ></img>} title={username} message={sex}></Result>
                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>兴趣爱好:{interest}</Brief>
                        <Brief>喜爱品牌：{brand}</Brief>
                        <Brief>月收入：{salary}</Brief>
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Button type="warning" onClick={this.Loginout}>退出登录</Button>
                </List>
            </div>
        )
    }
}
export default connect(state => ({ user: state.user }), { resetUser })(Personal)