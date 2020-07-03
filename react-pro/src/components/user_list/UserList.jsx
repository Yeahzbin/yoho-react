import React, { Component } from 'react'
import PropTypes from "prop-types"
import { WingBlank, WhiteSpace, Card } from "antd-mobile"
import Item from 'antd/lib/list/Item'
import { withRouter } from "react-router-dom"
const Header = Card.Header
const Body = Card.Body
class UserList extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    render() {
        return (
            <div style={{ marginBottom: 60 }}>
                {this.props.userList.map((item, index) => (<WingBlank key={item._id}>
                    <div>
                        <WhiteSpace />
                        <Card onClick={() => this.props.history.push(`/chat/${item._id}`)}>
                            <Header thumb={require(`../../assets/images/${item.header}.png`)} extra={item.username}>
                            </Header>
                            <Body>
                                <div>兴趣爱好：{item.interest}</div>
                                <div>喜爱品牌：{item.brand}</div>
                                <div>月收入：{item.salary}</div>
                                <div>个人介绍：{item.info}</div>
                            </Body>
                        </Card>
                    </div>
                </WingBlank>))}
            </div>
        )
    }
}
export default withRouter(UserList)