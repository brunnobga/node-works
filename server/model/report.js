var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Expense = require(__base('model/expense'));

var schemaName = 'Report';
var reportSchema = new Schema({
  title: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
  status: String,
  expenses: [ { type: Schema.Types.ObjectId, ref: Expense.schemaName } ]
});

reportSchema.statics.schemaName = schemaName;

module.exports = mongoose.model('Report', reportSchema);
