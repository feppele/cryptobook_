var express = require('express');
var router = express.Router();
const path = require('path');



router.use(express.static(path.join(__dirname, '../build'))); // app
router.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
})

module.exports = router