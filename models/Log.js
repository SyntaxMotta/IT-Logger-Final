const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  tech: {
    type: String,
    trim: true,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  attention: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Log', LogSchema);
