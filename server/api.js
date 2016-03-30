var express = require("express");
var report = require(__base('report/report'));
var receipt = require(__base('receipt/receipt'));

var router = express.Router();
router.use('/report', report);
router.use('/receipt', receipt);

module.exports = router;
