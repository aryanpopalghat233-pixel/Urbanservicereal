const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.post("/", async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.json({ success: true });
});

router.get("/", async (req, res) => {
  const data = await Booking.find();
  res.json(data);
});

module.exports = router;
