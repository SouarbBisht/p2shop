const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String,    unique: true },
  discordId: { type: String   , unique: true },
  purchases: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      purchaseDate: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
