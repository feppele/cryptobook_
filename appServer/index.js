// server/index.js
//const lib = require("../src/web3/globalrun.js");
const express = require("express");
const path = require('path');
const PORT = process.env.PORT || 3002;
const app = express();
app.use(express.json());


//fetch("https://backendserverreact.azurewebsites.net/price?tokenid=111").then(res => {return res.json()}).then(console.log);


// build dir is in same folder -->  ./build

  // call react app
  app.use(express.static(path.join(__dirname, './build')));

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
  })



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
