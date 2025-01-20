import mongoose from 'mongoose';

const Doctor = mongoose.model('Doctor', new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    speciality: String,
  }));

export default Doctor;