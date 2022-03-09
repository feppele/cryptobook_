var express = require('express');
var router = express.Router();
const path = require('path');


router.use((res,req) => console.log("hey"))


router.use(express.static(path.join(__dirname, '../build'))); // app

router.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
    return
})

module.exports = router