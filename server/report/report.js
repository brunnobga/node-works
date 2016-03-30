var router = require("express").Router();
var Report = require(__base('model/report'));
var expenseRouter = require(__base('report/expense'));

router.use('/:_id/expense', expenseRouter);

router.get('/', function(req, res) {
    Report.find({}, function (err, docs) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(docs);
        }
    });
});

router.get('/:_id', function(req, res) {
    var _id = req.params._id;

    if(_id) {
        Report.findById(_id, function (err, doc) {
            if(err) {
                res.status(500).send(err);
            } else if(!doc) {
                res.status(404).end();
            } else {
                res.status(200).send(doc);
            }
        });
    } else {
        res.status(400).send('No _id was provided');
    }
});

router.post('/', function (req, res) {
    if(req.body != null) {
        var doc = new Report(req.body);
        doc.save(function (err, savedDoc) {
            if(!err) {
                res.status(201).send(savedDoc);
            } else {
                res.status(500).send('Something bad happend! :(');
            }
        })
    } else {
        res.status(400).send('No data present in request body.');
    }
});

router.put('/:_id', function (req, res) {

});

router.delete('/:_id', function (req, res) {
    var _id = req.params._id;

    if(_id) {
        Report.findByIdAndRemove(_id, function (err, doc) {
            if(err) {
                res.status(500).send(err);
            } else if(!doc) {
                res.status(404).end();
            } else {
                res.status(204).end();
            }
        });
    } else {
        res.status(400).send('No _id was provided');
    }
});

module.exports = router;
