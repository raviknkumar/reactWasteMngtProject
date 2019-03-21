import React,{Component} from "react"
import "./AddDustbin.css"
import Button from "react-bootstrap/Button";
import axios from "axios";
import Dustbin from "./Dustbin"
import {DustbinRestController} from "../../api/EndPoints"
import 'sweetalert2/dist/sweetalert2.min.css'
import 'sweetalert2/dist/sweetalert2.all.min.js'
import SweetAlert from "sweetalert2-react"


class AddDustbin  extends Component{

    state={
        date:this.formatDate(),
        id:null,
        latitude:null,
        longitude:null,
        fillAmount:null,
        visible:false,
        title:null,
        text:""
    };

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    };

    handleChange(e){
        this.setState(
            {[e.target.name]:e.target.value}
        );
    }

    handleSubmit()
    {
        let dustbin = new Dustbin();
        dustbin.dustbinId = parseInt(this.state.id);
        dustbin.date = this.state.date;
        dustbin.latitude = parseFloat(this.state.latitude);
        dustbin.longitude = parseFloat(this.state.longitude);
        dustbin.fillAmount = parseFloat(this.state.fillAmount);
        console.log(dustbin)

        /*axios.post(DustbinRestController.baseURL + DustbinRestController.addUrl, {dustbin}).then(res=>{
           this.setState({
               visible:true,
               type:"success",
               title:"Upload Succesfull",
               text:"Dustbin Data uploaded Succesfully"

           })
        }).catch(err=>
        {
            this.setState({
                visible:true,
                type:"error",
                title:"Upload Failed",
                text:err.message
            })
        });*/
        axios.post(DustbinRestController.baseURL + DustbinRestController.addUrl, {
            dustbinId:dustbin.dustbinId,
            date:dustbin.date,
            latitude:dustbin.latitude,
            longitude:dustbin.longitude,
            fillAmount:dustbin.fillAmount
        }).then(res=>{
            this.setState({
                visible:true,
                type:"success",
                title:"Upload Succesfull",
                text:"Dustbin Data uploaded Succesfully"

            })
        }).catch(err=>
        {
            this.setState({
                visible:true,
                type:"error",
                title:"Upload Failed",
                text:err.message
            })
        });
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

    render() {
        return(
            <div>
                <h4 className={"center green-text"}>Add Dustbin</h4>
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
                        <h6 className={"center"}>ID</h6>
                        <input className="white"
                               style={{border:"1px solid black",
                                   borderRadius: "4px",
                                   height: "30px",
                                   marginTop:"10px",
                                   paddingLeft: "10px"}}
                               type="number"
                               name={"id"}
                               placeholder="Enter Id"
                               onChange={this.handleChange}/>
                    </div>
                    <div className={"selectBox"}>
                        <h6 className={"center"}>Latitude</h6>
                        <input className="white"
                               style={{border:"1px solid black",
                                   borderRadius: "4px",
                                   height: "30px",
                                   marginTop:"10px",
                                   paddingLeft: "10px"}}
                               type="number"
                               name={"latitude"}
                               placeholder="Enter Latitude"
                               onChange={this.handleChange}/>
                    </div>
                    <div className={"selectBox"}>
                        <h6 className={"center"}>Longitude</h6>
                        <input className="white"
                               style={{border:"1px solid black",
                                   borderRadius: "4px",
                                   height: "30px",
                                   marginTop:"10px",
                                   paddingLeft: "10px"}}
                               type="number"
                               name={"longitude"}
                               placeholder="Enter Longitude"
                               onChange={this.handleChange}/>
                    </div>
                    <div className={"selectBox"}>
                        <h6 className={"center"}>Fill Amount</h6>
                        <input className="white"
                               style={{border:"1px solid black",
                                   borderRadius: "4px",
                                   height: "30px",
                                   marginTop:"10px",
                                   paddingLeft: "10px"}}
                               type="number"
                               name={"fillAmount"}
                               placeholder="Enter FillAmount"
                               onChange={this.handleChange}/>
                    </div>
                    <Button variant="primary"  onClick={this.handleSubmit} type="submit" className={"selextBox"}>
                        Add Data
                    </Button>
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

export default AddDustbin;



