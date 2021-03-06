// This is the appServer. It just provides the Build React App with a Node/Express Server.

const express = require("express");
const path = require('path');
const PORT = process.env.PORT || 3002;
const app = express();
app.use(express.json());


// call react app from build file
app.use(express.static(path.join(__dirname, './build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
})


// App listen
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
