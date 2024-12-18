import express from "express";
import cors from "cors";
import patientRoutes from "./routes/patientRoutes.js";
// import appointmentRoutes from "./routes/appointmentRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/patients", patientRoutes);
// app.use("/api/appointments", appointmentRoutes);

export default app;
