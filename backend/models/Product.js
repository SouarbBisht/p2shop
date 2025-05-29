const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String},
  phone: { type: String },
  price: { type: String },
  stock: { type: Number }
});

module.exports = mongoose.model('Product', productSchema);
