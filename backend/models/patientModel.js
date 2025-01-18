import mongoose from 'mongoose';

const Patient = mongoose.model('Patient', new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
  }));

export default Patient;