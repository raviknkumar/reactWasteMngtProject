import React,{Component} from "react"
import Carousel from 'react-bootstrap/Carousel'
import Carousel1 from "../assets/img/environmentjpg.jpg"
import Carousel2 from "../assets/img/environment2.jpg"
import Carousel3 from "../assets/img/environment3.jpg"
import Carousel4 from "../assets/img/environment4.jpg"
import GridItem from "../creativeTim/components/GridItem";
import GridContainer from "../creativeTim/components/GridContainer";
import "./Main.css"

class Main extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            index: 0,
            direction: null,
            interval:3000
        };
    }

    handleSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction,
        });
    }

    render() {
        const { index, direction } = this.state;
        return(
        <div>
                <Carousel
                    activeIndex={index}
                    direction={direction}
                    onSelect={this.handleSelect}
                    interval={this.state.interval}
                    nextLabel={"NEXT"}>
                    <Carousel.Item style={{position:"fixed",visibility:"visible",width:"inherit"}}>
                        <img src={Carousel1} alt={""} style={{height:"400px"}}/>
                    </Carousel.Item>
                    <Carousel.Item style={{position:"fixed",visibility:"visible",width:"inherit"}}>
                        <img src={Carousel2} alt={""} style={{height:"400px"}}/>
                    </Carousel.Item>
                    <Carousel.Item style={{position:"fixed",visibility:"visible",width:"inherit"}}>
                        <img src={Carousel3} alt={""} style={{height:"400px"}}/>
                    </Carousel.Item>
                    <Carousel.Item style={{position:"fixed",visibility:"visible",width:"inherit"}}>
                        <img src={Carousel4} alt={""} style={{height:"400px"}}/>
                    </Carousel.Item>
                </Carousel>
            <div>
                <h1 className={"center green-text"}>Welcome To Smart Waste Management..</h1>
                <div className={"center"} style={{fontSize:"30px",lineHeight:"1.5em"}}>
                    <p>A Step Ahead Towards A Green And Clean Environment</p>
                    <p>It is Every Individual Responsibility to keep our Environment clean.. So join us in making this environment green</p>
                </div>
            </div>

            <div style={{marginTop:"30px"}}>
                <GridContainer>
                    <GridItem xs={12} sm={6} md={3}>
                        <div className={"center"}>
                            <img src="https://img.icons8.com/color/96/000000/bell.png" alt={""}/>
                            <div style={{fontSize:"20px"}}>
                                Get Real time Details regarding Dustbin FillAmount
                            </div>
                        </div>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <div className={"center"}>
                            <img src="https://img.icons8.com/color/100/000000/garbage-truck.png" alt={""}/>
                            <div style={{fontSize:"20px"}}>
                                 Get Real time tracking of the VehicleDetails
                            </div>
                        </div>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <div className={"center"}>
                            <img src="https://img.icons8.com/color/96/000000/combo-chart.png" alt={""}/>
                            <div style={{fontSize:"20px"}}>
                                 Get RealTime Statistics info regarding Dustbins
                            </div>
                        </div>
                    </GridItem>

                    <GridItem xs={12} sm={6} md={3}>
                        <div className={"center"}>
                            <div style={{height:"100px",paddingTop:"25px"}}>
                            <i className={"fa fa-road fa-4x"} aria-hidden="true"/>
                            </div>
                            <div style={{fontSize:"20px"}}>
                                 Generation of Routes for Vehicles
                            </div>
                        </div>
                    </GridItem>

                </GridContainer>

            </div>
            </div>
        );
    }
}

export default Main;
