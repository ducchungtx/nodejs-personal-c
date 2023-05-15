require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./config/db');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan('combined')); // Logs HTTP requests to console
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(helmet()); // Adds security headers to HTTP responses
app.use(express.json()); // Parses incoming JSON data

// Routes
app.use('', (req, res, next) => {
  res.json({
    message: ' NODEJS API V1',
  });
})
app.use('/api/v1', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

sequelize
  .sync()
  .then(() => {
    console.log('Database connection has been established successfully.');
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
