import React,{Component} from 'react';
import './GenerateRoutes.css'
import { Form,Button} from 'react-bootstrap'
import VehicleInfo from './VehicleInfo'

class GenerateRoutes extends Component
{
    render() {
        return(
            <div>
            <h4 className={"center green-text"}>Generate Routes</h4>
                <Form className={"VehiclesForm"}>
                        <Form.Label>Number Of Vehicles</Form.Label>
                        <Form.Group className={"row"} controlId="formBasicEmail">
                        <Form.Control style={{width:"170px"}} type="number" placeholder="Number of Vehicles..." />
                        <Button style={{width:"150px",marginTop:"8px"}} variant="primary" type="submit">
                            Generate
                        </Button>
                    </Form.Group>
                </Form>
                <div>
                    <div className={"row"}>
                        <div className={"col s2 m2 l2"}>Vehicle Id</div>
                        <div className={"col s2 m2 l2"}>Vehicle Name</div>
                        <div className={"col s3 m3 l3"}> Distance To Travel</div>
                        <div className={"col s3 m3 l3"}>Routes To Cover</div>
                    </div>
                    <div className={"divider"}/>
                    <VehicleInfo/>
                </div>
            </div>
        );
    }
}

export default GenerateRoutes;
