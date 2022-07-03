
//const fetchi ="https://backendserverreact.azurewebsites.net"

import {fetchi} from '../globalData'

function getOptions(_methode,_ele){

    const params = {
        methode: _methode,
        ele: _ele
    };
    const options = {
        method: 'POST',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify( params )
    };
  return options;
}


// on Load get name from databank
async function getNameFromAddress(address){

    const options=getOptions("find",{address: address });

    return await fetch(fetchi+ "/databank",options).then(res => { return res.json()}).then(res=>{


        if(res[0].length > 0){
          return res[0][0].name;
        }else{
          return "unnamed";
        }
    })
  }




export { getNameFromAddress}