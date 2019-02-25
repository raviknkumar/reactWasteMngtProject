import React from 'react'

function Dustbin(props)
{
    var {dustbinInfo} = props;
    console.log("Props:"+props);
   return(
       <div className={"section row"}>
               <div className={"col s2 m2 l2"}>{dustbinInfo.id}</div>
               <div className={"col s3 m3 l3"}>{dustbinInfo.latitude} </div>
               <div className={"col s3 m3 l3"}>{ dustbinInfo.longitude }</div>
               <div className={"col s3 m3 l3"}> { dustbinInfo.fillAmount }</div>
       </div>
   );
}

export default Dustbin;
