var express = require("express");
var report = require(__base('report/report'));

var router = express.Router();
router.use('/report', report);

module.exports = router;
