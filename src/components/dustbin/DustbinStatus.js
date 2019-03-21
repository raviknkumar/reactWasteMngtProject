import React, {Component} from 'react'
import './DustbinStatus.css'
import DustbinList from "./DustbinList";
import {Button, Table} from 'react-bootstrap'
import axios from 'axios'
import {DustbinRestController} from "../../api/EndPoints"
import SweetAlert from "sweetalert2-react"


class DustbinStatus extends Component
{
    state = {
        date:null,
        data:[],
        show:false,
        valid:true,
        title: "",
    };

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

    fetchDustbinStatus = async (e) => {
         await this.validate();
        /*console.log(this.state.valid);*/
        if (this.state.valid === true) {
            axios.get(DustbinRestController.baseURL + DustbinRestController.findByDateUrl, {
                params: {
                    date: this.state.date
                }
            }).then(res => {
                this.setState({data: res.data})
                /*console.log(this.state.data);*/
            }).catch(err => {
                this.setState({errorMessage: err.message, show: true});
            });
        }
        console.log(this.state.show)

    };
    render() {
        return(
            <div>
                {
                    <SweetAlert
                        show={this.state.show}
                        title={"Oh snap! Error Encountered!"}
                        type= {"error"}
                        text= {this.state.errorMessage}
                    />
                }
                <SweetAlert
                    show={!this.state.valid}
                    title={this.state.title}
                    type= {this.state.type}
                    text= {this.state.text}
                    onConfirm={() => this.setState({ valid: true})}
                    />
                <h3 className={"center green-text"}>Dustbin Status</h3>
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
                               onChange={this.handleDataChange}/>
                    </div>
                    <div className={"selectBox"}>
                        <Button onClick={this.fetchDustbinStatus}
                                style={{marginTop:"18px",width:"100px",background:"#2874f0"}}
                                value={"fetch"}>Fetch
                        </Button>
                    </div>
                </div>
                <div style={{marginTop:"5px", border:"1px solid grey"}}>
                    <Table responsive={true} striped hover size={"sm"}>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Fill Amount</th>
                        </tr>
                        </thead>
                        <DustbinList dustbinNodes={this.state.data}/>
                    </Table>
                </div>
            </div>
        );
    }
}

export default DustbinStatus;
