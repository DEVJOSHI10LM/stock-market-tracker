// routes/portfolio.js
const express = require('express');
const Stock = require('../models/Stock');
const { verifyToken } = require('../middleware/auth'); // Middleware to verify JWT
const router = express.Router();

// Middleware to verify JWT
router.use(verifyToken);

// Get user's portfolio
router.get('/', async (req, res) => {
  try {
    const stocks = await Stock.find({ userId: req.user.id });
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a stock to the portfolio
router.post('/', async (req, res) => {
  const { name, price, quantity } = req.body;
  const newStock = new Stock({
    userId: req.user.id,
    name,
    price,
    quantity,
  });

  try {
    const savedStock = await newStock.save();
    res.status(201).json(savedStock);
  } catch (error) {
    res.status(400).json({ message: 'Error adding stock' });
  }
});

// Update a stock in the portfolio
router.put('/:id', async (req, res) => {
  const { price, quantity } = req.body;
  try {
    const updatedStock = await Stock.findByIdAndUpdate(
      req.params.id,
      { price, quantity },
      { new: true }
    );
    res.json(updatedStock);
  } catch (error) {
    res.status(400).json({ message: 'Error updating stock' });
  }
});

// Delete a stock from the portfolio
router.delete('/:id', async (req, res) => {
  try {
    await Stock.findByIdAndDelete(req.params.id);
    res.json({ message: 'Stock deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting stock' });
  }
});

module.exports = router;