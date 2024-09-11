const mongoose = require('mongoose');
require('dotenv').config(); // Ensure you load the .env file

const connectionString = process.env.MONGODB_URI;

console.log('MongoDB URI:', connectionString); // Check that the URI is correctly loaded

mongoose.connect(connectionString, {
  // Removed deprecated options
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connection open');
});

module.exports = db;
