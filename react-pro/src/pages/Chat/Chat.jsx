import React, { Component } from 'react'
import { NavBar, List, InputItem, Grid } from "antd-mobile"
import { connect } from "react-redux"
import { sendMsg } from '../../redux/actions'
const Item = List.Item
class Chat extends Component {
    state = {
        content: "",
        isShow: false //是否显示表情列表
    }
    //在第一次render之前回调
    componentWillMount() {
        const emojis = ['😀', '😃', '😄', '😂', '😍', '😛', '🙃', '😆', '😪', '🥴', '😀', '😃', '😄', '😂', '😍', '😛', '🙃', '😆', '😪', '🥴', '😀', '😃', '😄', '😂', '😍', '😛', '🙃', '😆', '😪', '🥴', '😀', '😃', '😄', '😂', '😍', '😛', '🙃', '😆', '😪', '🥴', '😀', '😃', '😄', '😂', '😍', '😛', '🙃', '😆', '😪', '🥴', '😀', '😃', '😄', '😂', '😍', '😛', '🙃', '😆', '😪', '🥴']
        this.emojis = emojis.map((item) => ({ text: item }))
    }
    toggleShow = () => {
        let isShow = !this.state.isShow
        this.setState({
            isShow
        })
        if (isShow) {
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }
    handleSend = () => {
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()
        //发送请求(发消息)
        if (content) {
            this.props.sendMsg({ from, to, content })
        }
        //清除输入框
        this.setState({
            content: '',
            isShow: false
        })
    }
    render() {
        const { user } = this.props
        const meId = user._id
        const targetId = this.props.match.params.userid
        const chatId = [meId, targetId].sort().join('_')
        //通过chat_id过滤
       const{ users, chatMsgs } = this.props.chatList
        if (!users[meId]) { return null }
        let imgname = users[targetId].header
        const chatMsg = chatMsgs.filter(msg => msg.chat_id === chatId)
        //得到目标用户的头像
        let targetImg = imgname ? require(`../../assets/images/${imgname}.png`) : null
        return (
            <div id='chat-page'>
                <NavBar>aa</NavBar>
                <List>
                    {
                        chatMsg.map(msg => {
                            if (meId === msg.from) {
                                //我发的
                                return <Item key={msg._id} className='chat-me' extra="我">{msg.content}</Item>
                            } else {
                                //对方发的
                                return <Item key={msg._id} thumb={targetImg}>{msg.content}</Item>
                            }
                        })
                    }
                    {/* <Item thumb={require("../../assets/images/头像1.png")}>你好</Item>
                    <Item className='chat-me' extra='我'></Item> */}
                </List>
                <div className='am-tab-bar'>
                    <InputItem placeholder="请输入" onFocus={() => this.setState({ isShow: false })} value={this.state.content} extra={<span><span onClick={this.toggleShow}>😀</span><span onClick={this.handleSend}>发送</span></span>} onChange={(val) => this.setState({ content: val })}></InputItem>
                    {
                        this.state.isShow ? <Grid data={this.emojis} columnNum={8} carouselMaxRow={4} isCarousel={true} onClick={(item) => { this.setState({ content: this.state.content + item.text }) }}></Grid> : null
                    }
                </div>
            </div>
        )
    }
}
export default connect(state => ({ user: state.user, chatList: state.chatList }), { sendMsg })(Chat)
