const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  service: String,
  date: String
});

module.exports = mongoose.model("Booking", bookingSchema);
