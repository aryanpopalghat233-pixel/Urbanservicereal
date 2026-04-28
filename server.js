const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/workers", require("./routes/workerRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

app.get('/api/bookings', async (req, res) => {
  const bookings = await Booking.find().populate('assignedWorker');
  res.json(bookings);
});
app.put('/api/bookings/approve/:id', async (req, res) => {

  const workers = await Worker.find({ available: true });

  if (workers.length === 0) {
    return res.json({ message: "No workers available" });
  }

  const randomWorker = workers[Math.floor(Math.random() * workers.length)];

  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    {
      status: "Approved",
      assignedWorker: randomWorker._id
    },
    { new: true }
  );

  res.json(booking);
});
