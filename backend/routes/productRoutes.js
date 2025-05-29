const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add product
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    if(!data.name || !data.phone ||!data.email || !data.price  ){
        return res.status(404).json({"message":"add the required field!","sucess":"false"});
    }
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

module.exports = router;
