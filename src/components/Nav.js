import React from 'react'
import { withRouter} from 'react-router-dom'

function Nav(props)
{
    return(
        <nav>
            <div className="nav-wrapper center" style={{backgroundColor:"green",fontSize:"24px"}}>
                <h4 className="center" style={{fontFamily: 'Lobster'}}>
                    <i className="fa fa-recycle" style={{paddingRight:"10px"}}/>
                     Smart Waste Management
                </h4>
            </div>
        </nav>
    );
}

export default withRouter(Nav);
