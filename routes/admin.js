var express = require('express');
var router = express.Router();
var path = require('path')

var authorization_controller = require('../controllers/authorizationController');

/* GET home page. */
router.get('/admin', authorization_controller.roleAuthorization(['admin','user','guest']), function(req, res, next) {
  res.sendFile(path.dirname(__dirname) + "\\views\\admin.html", { title: 'Express' });
});

module.exports = router;
