// models/beneficiary.js
const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 10000, // default balance
  },
  // extra space for more fields if needed
});

module.exports = mongoose.model('Beneficiary', beneficiarySchema);
