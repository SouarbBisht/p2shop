const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');

// Register user
router.post('/register', async (req, res) => {
  try {
    const data = req.body;
    if(!data.name || !data.email || !data.discordId){
        return res.status(404).json({"message":"add the required field!","sucess":"false"});
    }
    const email = data.email
    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(500).json({"message":"user already exists","sucess":"false"});  
    }
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Purchase a product
router.post('/:userId/buy', async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const user = await User.findById(req.params.userId);
    const product = await Product.findById(productId);

    if (!user || !product || product.stock < quantity) {
      return res.status(400).json({ error: 'Invalid data or insufficient stock' });
    }

    product.stock -= quantity;
    await product.save();

    user.purchases.push({ productId, quantity });
    await user.save();

    res.status(200).json({ message: 'Purchase successful', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
