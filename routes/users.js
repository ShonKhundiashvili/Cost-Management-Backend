// Shon, Khundiashvili, 332326305,
//Netanel, Yomtovian, 207498700,
//Chen, Bello, 315129015

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
