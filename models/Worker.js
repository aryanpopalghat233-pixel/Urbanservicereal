const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  service: String,
  lat: Number,
  lng: Number
});

module.exports = mongoose.model("Worker", workerSchema);
