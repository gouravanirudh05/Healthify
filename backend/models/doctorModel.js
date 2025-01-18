import mongoose from 'mongoose';

const Doctor = mongoose.model('Doctor', new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    specialty: String,
  }));

export default Doctor;