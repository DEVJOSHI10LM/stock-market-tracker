// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');
// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Replace 'YOUR_API_KEY' with your actual Alpha Vantage API key
const ALPHA_VANTAGE_API_KEY = '6QNKK815BEU26ERA';

// Endpoint to get stock price
app.get('/api/stock/:symbol', async (req, res) => {
  const symbol = req.params.symbol;

  try {
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: symbol,
        interval: '1min',
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    const timeSeries = response.data['Time Series (1min)'];
    const latestTime = Object.keys(timeSeries)[0];
    const latestPrice = timeSeries[latestTime]['1. open'];

    res.json({ symbol, latestPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});