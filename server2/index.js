// server/index.js

const express = require("express");
const path = require('path');
const PORT = process.env.PORT || 3002;
const app = express();
app.use(express.json());

// call react app
app.use(express.static(path.join(__dirname, '../build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
