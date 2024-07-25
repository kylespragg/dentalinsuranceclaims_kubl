// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  account: { type: String, unique: true, required: true },
  businessName: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
