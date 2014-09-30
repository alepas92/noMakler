var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('get-data', { title: 'Admin Panel' });
});

module.exports = router;