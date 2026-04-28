const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: String,
  service: String,
  address: String,

  status: {
    type: String,
    default: "Pending" // Pending | Approved | Rejected
  },

  assignedWorker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker",
    default: null
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', BookingSchema);
