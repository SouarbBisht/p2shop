const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String},
  phone: { type: String },
  price: { type: String },
  imgs: { type: String }
});

module.exports = mongoose.model('Product', productSchema);
