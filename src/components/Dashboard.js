import React, {Component} from 'react'
import GridItem from "../creativeTim/components/GridItem";
import GridContainer from "../creativeTim/components/GridContainer";
import Card from "../creativeTim/components/Card/Card"
import "./Dashboard.css"
import CardIcon from "../creativeTim/components/Card/CardIcon";
import CardFooter from "../creativeTim/components/Card/CardFooter";
import CardHeader from "../creativeTim/components/Card/CardHeader";
import Button from "react-bootstrap/Button";
import CardBody from "../creativeTim/components/Card/CardBody";
import ChartistGraph from 'react-chartist';
import axios from "axios";
import {AppUser, DustbinRestController} from "../api/EndPoints";

class Dashboard extends Component
{
    async getStatisticalData() {
        return axios.get(DustbinRestController.baseURL+DustbinRestController.findStatsInfoUrl, {
        params: {
            date: this.state.date
        }
    })
    };

    state={
        date:this.formatDate(),
        dustbinsFilled:0,
        distanceTravelled:0,
        fillAmount:0,
        data : {
            labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
            series: [
                [1, 2, 4, 8, 6, 10, 8, 2, 3, 6, 4]
            ]
        },
        lastUpdated:""
    };

    options = {
    high: 10,
    low: 0,
};

    constructor()
    {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    timeNow = function () {
        let currentDate = new Date()
    return ((currentDate.getHours() < 10)?"0":"") + currentDate.getHours() +":"+ ((currentDate.getMinutes() < 10)?"0":"") + currentDate.getMinutes() +":"+ ((currentDate.getSeconds() < 10)?"0":"") + currentDate.getSeconds();
}
    handleChange(e){
        this.setState(
            {[e.target.name]:e.target.value}
        );
    };


    formatDate() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    handleSubmit(){
        let result = this.getStatisticalData().then(res=>{
            let currentdate = new Date();
            this.setState({
                dustbinsFilled:res.data.numberOfDustbins,
                distanceTravelled:parseInt(res.data.totalDistanceTravlled, 10),
                fillAmount:res.data.totalFillAmount,
                data: {
                    labels: res.data.dustbinIds,
                    series: [res.data.fillAmounts]
                },
                lastUpdated: this.timeNow()
            })
        });
        console.log(result);
    }

    render() {
        return(
            <div className={"dashboard"}>
                <div className={"grid-content"}>
                    <div className={"selectBox"}>
                        <h6 className={"center"}>Date</h6>
                        <input type="date"
                               style={{border:"1px solid black",
                                   borderRadius: "4px",
                                   height: "30px",
                                   marginTop:"10px",
                                   paddingLeft: "10px"}}
                               className={"white datePicker"}
                               name={"date"}
                               placeholder={"Enter Date"}
                               defaultValue={this.formatDate()}
                               onChange={this.handleChange}/>
                    </div>
                    <Button variant="primary" onClick={()=>{this.handleSubmit()}} type="submit" style={{width:"100px"}}>Fetch</Button>
                </div>

                <div className={"dashboard"} style={{marginTop:"3%",marginLeft:"1%"}}>
                    <GridContainer>
                        <GridItem xs={12} sm={6} md={3}>
                            <Card>
                                <CardHeader color="warning">
                                <CardIcon color="warning">
                                    <i className="fa fa-trash fa-2x" aria-hidden="true"></i>
                                </CardIcon>
                                    <h5>Dustbins</h5>
                                    <h3>{this.state.dustbinsFilled}</h3>
                                </CardHeader>
                                <div className="divider seperator"></div>
                                <CardFooter stats>
                                    <div >
                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                           Total Dustbins Filled
                                        </a>
                                    </div>
                                </CardFooter>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={7} md={4}>
                            <Card>
                                <CardHeader color="info">
                                    <CardIcon color="info">
                                        <i className="fas fa-truck fa-2x"></i>
                                    </CardIcon>
                                    <h5 >Distance</h5>
                                    <h3 >{this.state.distanceTravelled} Km</h3>
                                </CardHeader>
                                <div className={"divider seperator"}/>
                                <CardFooter stats>
                                    <div >
                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                            Total Distance Travelled
                                        </a>
                                    </div>
                                </CardFooter>
                            </Card>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={3}>
                            <Card>
                                <CardHeader color="danger">
                                    <CardIcon color="danger">
                                        <i className="fas fa-chart-line fa-2x"></i>
                                    </CardIcon>
                                    <h5 >DustAmount</h5>
                                    <h3 >{this.state.fillAmount}</h3>
                                </CardHeader>
                                <div className={"divider seperator"}/>
                                <CardFooter stats>
                                    <div >
                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                            Total Dust Collected
                                        </a>
                                    </div>
                                </CardFooter>
                            </Card>
                        </GridItem>
                    </GridContainer>

                    <GridContainer>
                            <Card>
                                <CardHeader color="success">
                                    <ChartistGraph
                                        className="ct-chart"
                                        data={this.state.data} options={this.options} type={"Line"}
                                    />
                                </CardHeader>
                                <CardBody>
                                    <h4>Daily Individual Dustbin FillAmount</h4>
                                </CardBody>
                                <div className={"divider seperator"}/>
                                <CardFooter>
                                    <div>
                                        <a href="#pablo" onClick={e => e.preventDefault()}>
                                            Last Updated At {this.state.lastUpdated}
                                        </a>
                                    </div>
                                </CardFooter>
                            </Card>
                    </GridContainer>
                </div>
            </div>
        );
    }
}

export default Dashboard;
