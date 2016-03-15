var router = require("express").Router({ mergeParams: true });
var Report = require(__base('model/report'));

router.get('/', function(req, res) {
    var reportId = req.params._id;
    Report.findById(reportId, function(err, report) {
        if(err) {
            res.status(500).send(err);
        } else if(!report) {
            res.status(404).end();
        } else {
            res.status(200).send(report.expenses);
        }
    });
});

router.get('/:expenseId', function(req, res) {
    var reportId = req.params._id;
    Report.findById(reportId, function(err, report) {
        if(err) {
            res.status(500).send(err);
        } else if(!report) {
            res.status(404).end();
        } else {
            var expenseId = req.params.expenseId;
            if(report.expenses[expenseId]) {
                res.status(200).send(report.expenses[expenseId]);
            } else {
                res.status(404).end();
            }
        }
    });
});

router.post('/', function(req, res) {
    var reportId = req.params._id;
    Report.findById(reportId, function(err, report) {
        if(err) {
            res.status(500).send(err);
        } else if(!report) {
            res.status(404).end();
        } else {
            var expense = req.body;
            report.expenses.push(expense);
            report.save(function(err, savedReport) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.status(201).send(savedReport
                        .expenses[savedReport.expenses.length - 1]);
                }
            });
        }
    });
});

module.exports = router;
