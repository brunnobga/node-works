var express = require("express");
var Report = require(__base('model/report'))
var router = express.Router();

router.get('/', function(req, res) {
    Report.find({}, function (err, docs) {
        var result = [];
        for (var i = 0; i < docs.length; i++) {
            result.push(docs[i]);
        }
        res.status(200).send(result);
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

router.patch('/:_id', function (req, res) {

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

// router.post('/:_id/expense', function (req, res) {
//
// });

module.exports = router;
