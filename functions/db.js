// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
