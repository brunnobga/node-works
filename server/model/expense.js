var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Receipt = require(__base('model/receipt'));

var schemaName = 'Expense';
var expenseSchema = new Schema({
  date: { type: Date, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  description: String,
  department: { type: String, required: true },
  receipt: { type: Schema.Types.ObjectId, ref: Receipt.schemaName }
});

expenseSchema.statics.schemaName = schemaName;

module.exports = mongoose.model(schemaName, expenseSchema);
