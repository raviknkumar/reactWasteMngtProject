import React, {Component} from "react"

class Vehicle extends Component{
    render() {
        let {info} = this.props;
        return(
                <div className={"row"}>
                    <div className={"col s2 m2 l2"}>{info.id}</div>
                    <div className={"col s2 m2 l2"}>{info.vehicleName}</div>
                    <div className={"col s3 m3 l3"}> {info.distanceToTravel}</div>
                    <div className={"col s3 m3 l3"}>{info.routesToCover}</div>
                </div>
        );
    }
}

export default Vehicle;
