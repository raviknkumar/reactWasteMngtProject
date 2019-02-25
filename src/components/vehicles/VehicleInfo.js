import React, {Component} from "react"
import Vehicle from "./Vehicle";

class VehicleInfo extends Component{
    render() {
        return(
            <div>
                <div className={"container"}>
                    <Vehicle info={{id:"1",vehicleName:"V1",distanceToTravel:"200",routesToCover:"r1,r2,r3"}}/>
                    <Vehicle info={{id:"1",vehicleName:"V1",distanceToTravel:"200",routesToCover:"r1,r2,r3"}}/>
                </div>
            </div>
        );
    }
}

export default VehicleInfo;
