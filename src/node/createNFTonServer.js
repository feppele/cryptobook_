

const fetchi ="https://backendserverreact.azurewebsites.net"


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




async function createNFTonServer(metaDataURL,selectedFile,collection,itemName,searchTearms){

    const options = getOptions("",{metaDataURL:metaDataURL,selectedFile:selectedFile,collection:collection,itemName:itemName,searchTearms:searchTearms})

    return await fetch( fetchi + "/createNFTandDBupload",options).then(res => { return res.json()}).then(res=>{})
}



export {createNFTonServer}