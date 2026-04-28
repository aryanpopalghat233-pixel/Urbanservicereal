const express = require("express");
const router = express.Router();
const Worker = require("../models/Worker");

router.post("/", async (req, res) => {
  const worker = new Worker(req.body);
  await worker.save();
  res.json({ success: true });
});

router.get("/", async (req, res) => {
  const data = await Worker.find();
  res.json(data);
});

module.exports = router;
