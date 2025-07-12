// server.js
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/restaurants', require('./routes/restaurantRoutes'));
app.use('/api/menu-items', require('./routes/menuRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

