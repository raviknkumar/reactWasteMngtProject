import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/Signup";
import Home from './components/Home'

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <Route path={"/"} exact component={Login}/>
            <Route path={"/login"} component={Login}/>
            <Route path={"/signup"} component={SignUp}/>
            {/* <Route path={"/home"}component={Home} />*/}
              <Route path={"/home"} render={props => (
                  localStorage.getItem('userName')!==null
                      ? <Home {...props}/>
                      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
              )} />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
