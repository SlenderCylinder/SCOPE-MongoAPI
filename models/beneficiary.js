// models/beneficiary.js
const mongoose = require('mongoose');

const purchaseHistorySchema = new mongoose.Schema({
  itemName: String,
  itemPrice: Number,
  itemQuantity: Number,
  dateOfPurchase: Date,
});

const beneficiarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 10000, // default balance
  },
  firstName: String,
  lastName: String,
  uniqID: String,
  purchaseHistory: [purchaseHistorySchema],
  // extra space for more fields if needed
});

module.exports = mongoose.model('Beneficiary', beneficiarySchema);

