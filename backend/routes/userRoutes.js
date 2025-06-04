const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required", success: false });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User does not exist", success: false });
      }
  
      const isMatch = user.password == password
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid password", success: false });
      }
  
      // Create JWT
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
  
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
  
      res.status(200).json({
        message: "Login successful",
        success: true,
        user: {
          name: user.name,
          email: user.email
        }
      });
  
    } catch (err) {
      res.status(500).json({ error: err.message, success: false });
    }
  });
router.post('/logout', async (req, res) => {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'strict'
      });
  
      res.status(200).json({ message: 'Logout successful', success: true });
  
  
    } catch (err) {
      res.status(500).json({ error: err.message, success: false });
    }
  });

// Register user
router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Add all required fields!", success: false });
      }
  
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(409).json({ message: "User already exists", success: false });
      }
  
      const newUser = new User({ name, email, password });
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully", success: true });
  
    } catch (err) {
      res.status(500).json({ error: err.message, success: false });
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
