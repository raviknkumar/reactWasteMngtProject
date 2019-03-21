import React,{Component} from 'react';
import './GenerateRoutes.css'
import {Button} from "react-bootstrap";
import axios from "axios"
import {DustbinRestController} from "../../api/EndPoints";
import SweetAlert from "sweetalert2-react"


class GenerateRoutes extends Component
{
    state={
        date:this.formatDate(),
        numberOfVehicles:null,
        vehicleCapacity:null,
        visible:false,
        title:"",
        type:"success",
        text:""
    };



    async generateRoutes(){
        var params = new URLSearchParams();
        params.append("date",this.state.date);
        params.append("numberOfVehicles",this.state.numberOfVehicles);
        params.append("vehicleCapacity",this.state.vehicleCapacity);

        var request = {
            params: params
        };
        console.log(DustbinRestController.baseURL + DustbinRestController.generateRoutesUrl+"  "+request);

            return axios.get(DustbinRestController.baseURL + DustbinRestController.generateRoutesUrl, request)
    }


    formatDate(date) {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    constructor()
    {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState(
            {[e.target.name]:e.target.value}
        );
    }

    handleSubmit()
    {
        this.generateRoutes().then(res=>{
            this.setState({
                visible:true,
                type:"success",
                title:"Generation Succesfull",
                text:res.data
            })
        }).catch(err=>{
            this.setState({
                visible:true,
                type:"error",
                title:"Error Encountered!",
                text:err.message
            })
        })
    }

    render() {
        return(
            <div>
            <h4 className={"center green-text"}>Generate Routes</h4>
                <div className={"bg-purple grid-content"}>
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
                               onChange={this.handleChange}
                        />
                    </div>
                    <div className={"selectBox"}>
                        <h6 className={"center"}>Number Of Vehicles</h6>
                        <input className="white"
                               style={{border:"1px solid black",
                                   borderRadius: "4px",
                                   height: "30px",
                                   marginTop:"10px",
                                   paddingLeft: "10px"}}
                               type="number"
                               name={"numberOfVehicles"}
                               placeholder="Enter Number Of Vehicles"
                               onChange={this.handleChange}/>
                    </div>

                    <div className={"selectBox"}>
                        <h6 className={"center"}>Vehicle Capacity</h6>
                        <input className="white"
                               style={{border:"1px solid black",
                                   borderRadius: "4px",
                                   height: "30px",
                                   marginTop:"10px",
                                   paddingLeft: "10px"}}
                               type="number"
                               name={"vehicleCapacity"}
                               placeholder="Enter Capacity Of Vehicle"
                               onChange={this.handleChange}/>
                    </div>

                    <div className={"selectBox"}>
                        <Button variant="primary"  onClick={this.handleSubmit} type="submit" style={{width:"min-content"}}>
                            GenerateRoutes
                        </Button>
                    </div>
                </div>

                <SweetAlert
                    show={this.state.visible}
                    title={this.state.title}
                    type= {this.state.type}
                    text= {this.state.text}
                    onConfirm={() => this.setState({ visible: false })}/>

            </div>
        );
    }
}

export default GenerateRoutes;
