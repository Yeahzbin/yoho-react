import React, { Component } from 'react'
import { connect } from "react-redux"
import { getUserList } from "../../redux/actions"
import UserList from "../../components/user_list/UserList"
class Women extends Component {
    componentDidMount() {
       
        this.props.getUserList("women");
    }
    render() {
        let { userList } = this.props
        return (
            <div>
                <UserList userList={userList}></UserList>
            </div>
        )
    }
}
export default connect(state => ({  userList: state.userList }), { getUserList })(Women)