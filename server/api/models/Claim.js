// models/Claim.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const claimSchema = new Schema({
  businessAddress: { type: String, required: true },
  procedureType: { type: String, required: true },
  cost: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false }
});

module.exports = mongoose.model('Claim', claimSchema);
