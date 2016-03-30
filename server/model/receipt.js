var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schemaName = 'Receipt';
var receiptSchema = new Schema({
  date: { type: Date, required: true },
  filename: String,
  data: Buffer
});

receiptSchema.statics.schemaName = schemaName;

module.exports = mongoose.model(schemaName, receiptSchema);
