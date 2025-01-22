import mongoose from 'mongoose';

const Prescription = mongoose.model("Presciption", new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    doctorName: String,
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
    patientName: String,
    medication: String,
    frequency: String,
    days: String,
  }));

export default Prescription;