import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/Signup";
import Home from './components/Home'
import Dashboard from "./components/Dashboard";
class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <Route path={"/"} exact component={Login}/>
            <Route path={"/login"} component={Login}/>
            <Route path={"/signup"} component={SignUp}/>
            <Route path={"/home"} component={Home}/>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
