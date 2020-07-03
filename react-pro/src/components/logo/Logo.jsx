import React, { Component } from 'react'
import './logo.css'
import logo from './logo.jpg'
export default class Logo extends Component {
    render() {
        return (
            <div className="logo-container">
                <img src={logo} alt="logo" className="logo-img"></img>
            </div>
        )
    }
}
