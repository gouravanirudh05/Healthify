import mongoose from 'mongoose';

const Appointment = mongoose.model("Appointment", new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    doctorName: String,
    date: String,
    time: String,
  }));

export default Appointment;