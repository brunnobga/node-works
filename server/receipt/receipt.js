var router = require("express").Router();
var multer  = require('multer');
var upload = multer();
var Receipt = require(__base('model/receipt'));

router.get('/', function(req, res) {
    Receipt.find({}, '-data', function (err, receipts) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(receipts);
        }
    });
});

router.get('/:_id', function(req, res) {
    var _id = req.params._id;

    if(_id) {
        Receipt.findById(_id, '-data',function (err, receipt) {
            if(err) {
                res.status(500).send(err);
            } else if(!receipt) {
                res.status(404).end();
            } else {
                res.status(200).send(receipt);
            }
        });
    } else {
        res.status(400).send('No _id was provided');
    }
});

router.get('/:_id/data', function(req, res) {
    var _id = req.params._id;

    if(_id) {
        Receipt.findById(_id, function (err, receipt) {
            if(err) {
                res.status(500).send(err);
            } else if(!receipt) {
                res.status(404).end();
            } else {
                res.status(200).send(receipt.data);
            }
        });
    } else {
        res.status(400).send('No _id was provided');
    }
});

router.post('/', upload.single('data'), function(req, res) {
    if(req.file != null) {
        var receipt = {
            date: Date.now(),
            filename: req.file.originalname,
            data: req.file.buffer
        };
        var doc = new Receipt(receipt);
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

router.delete('/:_id', function(req, res) {
    var _id = req.params._id;

    if(_id) {
        Receipt.findByIdAndRemove(_id, function (err, doc) {
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
