//Let __base() redirect to the root of the project (where the app is running)
global.__base = function (mod) { return __dirname + '/' + mod; };

//Start here
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var api = require(__base('api'));

mongoose.connect('mongodb://localhost/reportsDatabase');

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/', express.static('client'));
app.use('/api', api);

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port 8080!');
});
