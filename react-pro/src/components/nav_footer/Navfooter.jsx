import React, { Component } from 'react'
import { TabBar } from "antd-mobile"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
const Item = TabBar.Item
//希望在非路由组件中使用路由库api
//使用编程式路由
class Navfooter extends Component {
    static propTypes = {
        navList: PropTypes.array.isRequired
    }
    render() {
        let { navList } = this.props
        navList = navList.filter(nav => !nav.hide)
        const path = this.props.location.pathname
        return (
            <TabBar>
                {
                    navList.map(nav => (<Item key={nav.path} title={nav.text} icon={{ uri: require(`./images/${nav.icon}.png`) }} selectedIcon={{ uri: require(`./images/${nav.icon}-selected.png`) }} selected={path === nav.path} onPress={() => this.props.history.replace(nav.path)}></Item>))
                }
            </TabBar>
        )
    }
}
export default withRouter(Navfooter)//向外暴露withRouter()包装产生组件，内部会向组件中传入路由组件特有的属性，history/location/math