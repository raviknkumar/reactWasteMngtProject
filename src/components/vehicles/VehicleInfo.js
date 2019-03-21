import React, {Component} from "react"
import VehicleComponent from "./VehicleComponent";
import axios from "axios";
import { VehicleController} from "../../api/EndPoints";
import SweetAlert from "sweetalert2-react";
import {Badge, Button, Table} from "react-bootstrap";

class VehicleInfo extends Component{

    state = {
        date:null,
        data:[],
        show:false,
        valid:true,
        title: "",
    }

    handleDataChange = (e)=>
    {
        this.setState({date:e.target.value});
        console.log("Date:"+e.target.value)
    };

    validate(){
        if(this.state.date === null || this.state.date ==="")
        {
            this.setState({valid:false,title:"Error",
                type:"error",text:"Please Enter a date!"});
        }
        else
            this.setState({valid:true});
    }

    fetchVehiclesInfo = async (e) => {
        await this.validate();
        if (this.state.valid === true) {
            axios.get(VehicleController.baseURL + VehicleController.fetchVehicleInfoUrl, {
                params: {
                    date: this.state.date
                }
            }).then(res => {
                this.setState({data: res.data})
                console.log(this.state.data);
            }).catch(err => {
                this.setState({errorMessage: err.message, show: true});
            });
        }
        console.log(this.state.show)
    };

    render() {
        return(
            <div>
                    <SweetAlert
                        show={this.state.show}
                        title={"Oh snap! Error Encountered!"}
                        type= {"error"}
                        text= {this.state.errorMessage}
                    />
                <SweetAlert
                    show={!this.state.valid}
                    title={this.state.title}
                    type= {this.state.type}
                    text= {this.state.text}
                    onConfirm={() => this.setState({ valid: true})}
                />

                <h3 className={"center green-text"}>View Routes Generated</h3>
                <div className={"bg-purple grid-content"} style={{height:"wrap-content"}}>
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
                               onChange={this.handleDataChange}/>
                    </div>
                    <div className={"selectBox"}>
                        <Button onClick={this.fetchVehiclesInfo}
                                style={{marginTop:"18px",width:"min-content",background:"#2874f0",textTransform: "capitalize"}}
                                value={"fetch"}>Fetch&nbsp;Routes
                        </Button>
                    </div>
                </div>
                <div style={{marginTop:"5px"}}>
                    <Table responsive={true} outlined={true} bordered={true} hover size={"sm"}>
                        <thead className={"grey"} >
                        <tr>
                            <th>Vehice Id</th>
                            <th>path Followed</th>
                            <th>Distance Travelled</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.data.map((vehicle,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{vehicle.vehicleId}</td>
                                    <td>{vehicle.pathFollowed.map(dustbinId=> {
                                            if(dustbinId===0)
                                                return <Badge className={"white-text"} variant="primary">0</Badge>
                                        else
                                                return <span className={"yellow black-text"}>{dustbinId+", "}&nbsp;</span>;
                                    })
                                    }</td>
                                    <td>{parseInt(vehicle.totalDistanceTravelled,10)}</td>
                                </tr>
                            );
                        })
                        }
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default VehicleInfo;
