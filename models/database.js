const mongoose = require('mongoose');
require('dotenv').config(); // Ensure dotenv is required

const connectionString = process.env.DB_CONNECTION_STRING;

mongoose.connect(connectionString)
  .then(() => console.log("Database connected"))
  .catch(err => console.log("Database not connected", err));

module.exports = mongoose;