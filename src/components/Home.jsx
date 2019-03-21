import React, {Component} from 'react'
import { Route, withRouter} from 'react-router-dom'
import MetisMenu from 'react-metismenu'
import './Home.css'

import CustomDropDown from './CustomDropDown'
import Dashboard from "./Dashboard";
import GenerateRoutes from "./vehicles/GenerateRoutes";
import DustbinStatus from "./dustbin/DustbinStatus";
import {signUpUrl} from "../api/EndPoints";
import AddDustbin from "./dustbin/AddDustbin";
import Main from "./Main";
import VehicleInfo from "./vehicles/VehicleInfo";

class Home extends Component{

    match = this.props.match;

    render() {
        console.log("Url:"+signUpUrl());
        const
            content = [
                {
                    icon: 'fas fa-home',
                    label: 'Home',
                    to: '/home/index',
                },
                {
                    icon: 'fas fa-tachometer-alt',
                    label: 'Dashboard',
                    to: '/home/dashboard',
                },
                {
                    icon: 'fas fa-trash',
                    label: 'Dustbin',
                    content: [
                        {
                            icon: 'fas fa-plus',
                            label: 'Add Dustbin Status',
                            to: `/home/dustbin/add`
                        },
                        {
                            icon: 'fas fa-info-circle',
                            label: 'View Status',
                            to: '/home/dustbin/status',
                        }
                    ]
                },
                {
                    icon: 'far fa-route',
                    label: 'routes',
                    content: [
                        {
                            icon: 'fas fa-truck',
                            label: 'Generate Routes',
                            to: `/home/generateRoutes`,
                        },
                        {
                            icon: 'fas fa-road',
                            label: 'View Routes',
                            to: `/home/viewRoutes`
                        }
                    ]
                }
            ];

        return(
                <div className={"row"}>
                    <MetisMenu className={"col s2 m2 l2 sidebar"} content={content}/>
                    <div className={"col s8 m7 l7 offset-m2 offset-l2 offset-s2"}>
                            <div className={"right"}>
                                <CustomDropDown/>
                            </div>
                            <div style={{marginTop:"6%"}}>
                            <Route path={`${this.match.path}/dashboard`} exact component={Dashboard}/>
                            <Route path={`${this.match.path}/index`} exact component={Main}/>
                            <Route path={`${this.match.path}/generateRoutes`} exact component={GenerateRoutes}/>
                            <Route path={`${this.match.path}/dustbin/add`} exact component={AddDustbin}/>
                            <Route path={`${this.match.path}/dustbin/status`} exact component={DustbinStatus}/>
                            <Route path={`${this.match.path}/viewRoutes`} exact component={VehicleInfo}/>
                            </div>
                    </div>
                </div>
        );
    }
}
export default withRouter(Home);
