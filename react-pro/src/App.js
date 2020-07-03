import React from 'react';
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Main from "./pages/main/Main"
import { HashRouter as Router, Link, Switch, Route } from "react-router-dom"
import './App.less';
import 'antd-mobile/dist/antd-mobile.css';
//应用根组件
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route component={Main}></Route>
        </Switch>
      </Router>

    </div >
  );
}

export default App;
