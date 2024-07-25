// models/Business.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessSchema = new Schema({
  address: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Business', businessSchema);
