// models/beneficiary.js
const mongoose = require("mongoose");

const purchaseHistorySchema = new mongoose.Schema({
  itemName: String,
  itemPrice: Number,
  itemQuantity: Number,
  dateOfPurchase: Date,
});

const beneficiarySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  balance: {
    type: Number,
    default: 10000, // default balance
  },
  scopeId: { type: Number, required: true },
  purchaseHistory: [purchaseHistorySchema],
  // extra space for more fields if needed
});

module.exports = mongoose.model("Beneficiary", beneficiarySchema);
