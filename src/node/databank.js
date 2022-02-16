
//test:
//  query("add",{address:"0x15Db0F018209098e5e96FF68CB88F7080b65A841",username:"account4"});
//  query("find",{address:"0x15Db0F018209098e5e96FF68CB88F7080b65A841"});


  // methode: "find", "add".  ele= {address:address,username:username}
function query(_methode,_ele){

    const params = {
      methode: _methode,
      ele: _ele
  };
  const options = {
      method: 'POST',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify( params )
  };
  fetch("databank",options)
  .then(res => {return res.json()})
}







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

async function queryFetch(options){

fetch("databank",options)
.then(res => {return res.json()})

}





export{getOptions};
export{queryFetch};
export{query};