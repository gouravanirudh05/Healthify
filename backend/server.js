const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Agora = require("agora-access-token"); // Agora SDK for token generation

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
const mongoURI = "mongodb+srv://gouravbj2005:MDganapa05@healthify.szb75.mongodb.net/";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Models
const Doctor = mongoose.model("Doctor", new mongoose.Schema({ name: String, specialty: String }));
const Appointment = mongoose.model("Appointment", new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  doctorName: String,
  date: String,
  time: String,
}));

// Generate Agora token
app.post("/api/generate-token", (req, res) => {
  const { channelName } = req.body;

  if (!channelName) {
    return res.status(400).json({ message: "Channel name is required" });
  }

  const appId = "252142d27f2a41b083a166b76c41d881";
  const appCertificate = "c8970cde26054522ac9ead01ea602ba1";
  const expirationTimeInSeconds = 3600;

  const token = Agora.RtcTokenBuilder.buildTokenWithUid(
    appId,
    appCertificate,
    channelName,
    0, // UID
    Agora.RtcRole.PUBLISHER,
    Math.floor(Date.now() / 1000) + expirationTimeInSeconds
  );

  res.json({ token, channelName });
});

// API Routes
app.get("/api/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching doctors", error: err });
  }
});

app.post("/api/appointments", async (req, res) => {
  try {
    const { doctorId, doctorName, date, time } = req.body;
    const appointment = new Appointment({ doctorId, doctorName, date, time });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: "Error scheduling appointment", error: err });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
