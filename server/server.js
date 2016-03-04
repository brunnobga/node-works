//Let __base() redirect to the root of the project (where the app is running)
global.__base = function (mod) { return __dirname + '/' + mod; };

//Start here
var express = require('express');
var mongoose = require('mongoose');
var api = require(__base('api'));

//mongoose.connect('mongodb://localhost/reportsDatabase');

var app = express();
app.use('/', express.static('client'));
app.use('/api', api);

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port 3000!');
});
