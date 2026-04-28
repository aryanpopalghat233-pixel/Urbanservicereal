const mongoose = require('mongoose');

const WorkerSchema = new mongoose.Schema({
  name: String,
  service: String,

  lat: Number,
  lng: Number,

  available: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Worker', WorkerSchema);
