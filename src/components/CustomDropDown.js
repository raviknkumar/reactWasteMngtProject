import React, {Component} from 'react'
import {Dropdown, DropdownButton} from "react-bootstrap";

import './CustomDropDown.css'

class CustomDropDown extends Component
{
    constructor(props)
    {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

     handleClick(e)
    {
        localStorage.removeItem("userName");
        console.log("Removed");
    }

    render() {
        return(
            <DropdownButton className="right" id="dropdown-basic-button" title={localStorage.getItem("userName")}
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <Dropdown.Item className="cl" href="/viewProfile">
                    <i className="fa fa-id-card fa-lg" style={{color:"#2874f0", fontSize: "1.5em"}} aria-hidden="true"></i>
                    &nbsp; View Profile
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={this.handleClick} href="/">
                    <i className="fa fa-sign-out-alt" style={{color:"#2874f0", fontSize: "1.5em"}} aria-hidden="true"></i>
                    &nbsp; Logout
                </Dropdown.Item>
            </DropdownButton>
        );
    }
}

export default CustomDropDown;
