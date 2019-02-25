import React, {Component} from 'react'
import './DustbinStatus.css'
import DustbinList from "./DustbinList";
import { Button } from 'react-bootstrap'
import axios from 'axios'
class DustbinStatus extends Component
{
    state = {
        date:null,
        data:[]
    };

    handleDataChange = (e)=>
    {
        this.setState({date:e.target.value});
    };

    fetchDustbinStatus = e =>
    {
        /* */
        axios
            .get(`https://jsonplaceholder.typicode.com/posts`)
            .then(res => this.setState({ data: res.data }))
            .catch(err => console.log(err));
        console.log(this.state.date);
    };
    render() {
        return(
            <div>
            <h3 className={"center green-text"}>Dustbin Status</h3>
                <div className={"container"}>
                    <div className={"row"}>
                        <h4>Date </h4>
                        <input type="date"
                               name={"date"}
                               style={{marginLeft:"20px",width:"20%",border:"1px solid black"}}
                               placeholder={"Enter Date"}
                                onChange={this.handleDataChange}
                                />
                        <Button onClick={this.fetchDustbinStatus}  style={{width:"100px"}} value={"fetch"}>Fetch</Button>
                    </div>
                    <div className={"row section"}>
                        <div className={"col s2 m2 l2"}>Id</div>
                        <div className={"col s3 m3 l3"}>Latitude </div>
                        <div className={"col s3 m3 l3"}>Longitude</div>
                        <div className={"col s3 m3 l3"}>Fill Amount</div>
                    </div>
                    <div className={"divider"}/>
                    <DustbinList/>
                </div>
            </div>
        );
    }
}

export default DustbinStatus;
