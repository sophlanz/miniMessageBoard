//express router
var express = require('express');
var router = express.Router();
//import schema
const User = require('../models/Users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
