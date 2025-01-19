import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from 'multer';
import * as Agora from "agora-access-token"; // Agora SDK for token generation
import Doctor from "./models/doctorModel.js"
import Appointment from "./models/appointmentModel.js"
import Patient from "./models/patientModel.js"
import Admin from "./models/adminModel.js";
import Report from "./models/reportModel.js";
import patientAuthMiddleware from "./middlewares/patientAuthMiddleware.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 5000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas connection
const mongoURI = "mongodb+srv://sathishsv:Sanvij1103@cluster0.3llub.mongodb.net/healthifydatabase";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("MongoDB connection error:", err));


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

app.post("/api/patient/login", async (req, res) => {
  try {
      const { email, password } = req.body;
      const patient = await Patient.findOne({ email });
      if (!patient) {
          return res.status(404).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, patient.password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: patient._id }, 'your_secret_key', { expiresIn: '3h' });

      res.json({ token });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.post("/api/doctor/login", async (req, res) => {
  try {
      const { email, password } = req.body;
      const doctor = await Doctor.findOne({ email });
      if (!doctor) {
          return res.status(404).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, doctor.password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: doctor._id }, 'your_secret_key', { expiresIn: '3h' });

      res.json({ token });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.post("/api/admin/login", async (req, res) => {
  try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });
      if (!admin) {
          return res.status(404).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: admin._id }, 'your_secret_key', { expiresIn: '3h' });

      res.json({ token });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.post("/api/admin/signup", async (req, res) => {
  try {
    let user_username = await Admin.findOne({ name: req.body.name });
    let user_email = await Admin.findOne({ email: req.body.email });
    if (user_email) {
        return res.status(403).json({ message: 'User already exists, please log in' });
    }
    else if (user_username) {
        return res.status(403).json({ message: 'Username already exists, try using a different one' });
    }

    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();
    return res.status(201).json({ message: 'Admin created successfully' });
} catch (error) {
    return res.status(500).json({ error: error.message });
}
});

app.post("/api/patient/register", async (req, res) => {
  try {
    let user_username = await Patient.findOne({ name: req.body.name });
    let user_email = await Patient.findOne({ email: req.body.email });
    if (user_email) {
        return res.status(403).json({ message: 'User already exists, please log in' });
    }
    else if (user_username) {
        return res.status(403).json({ message: 'Username already exists, try using a different one' });
    }

    const { name, email, age, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let admin = new Patient({ name, email, age, password: hashedPassword });
    await admin.save();
    return res.status(201).json({ message: 'Admin created successfully' });
} catch (error) {
    return res.status(500).json({ error: error.message });
}
});

app.post("/api/appointments/schedule", async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const appointment = new Appointment({ doctorId, date, time });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: "Error scheduling appointment", error: err });
  }
});

// Endpoint for uploading a PDF
app.post('/api/report/upload', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const patient = await Patient.findById(req.body.patientId);

    if (!patient) {
      return res.status(404).send('Patient not found');
    }

    const newReport = new Report({         
      name: req.body.name,
      pdf: req.file.buffer,
      patientId: patient._id,
      date: req.body.date,
      //contentType: req.file.mimetype,
    });


    const rprt = await newReport.save();
    //console.log(rprt);
    res.status(200).send({ message: 'File uploaded and saved successfully!', id: newReport._id });
  } catch (error) {
    res.status(500).send('Error uploading the file');
  }
});

app.get('/api/getReports', patientAuthMiddleware, async (req, res) => {
  try {
    const reports = await Report.find({ patientId: req.patient._id});
    res.status(200).send({reports: reports});
  } catch (error) {
    res.status(500).send('Error retrieving the reports');
  }
})

// Endpoint for downloading a PDF by ID
app.get('api/report/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).send('Report not found');
    }

    res.contentType(report.contentType);
    res.send(report.pdf);
  } catch (error) {
    res.status(500).send('Error retrieving the report');
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
