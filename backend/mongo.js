const mongoose = require('mongoose');

// MongoDB Atlas connection (replace <username>, <password>, and <dbname> with your values)
const mongoURI = 'mongodb+srv://gouravbj2005:MDganapa05@healthify.szb75.mongodb.net/';
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Define Doctor and Appointment models
const Doctor = mongoose.model('Doctor', new mongoose.Schema({
  name: String,
  specialty: String,
}));

const Appointment = mongoose.model('Appointment', new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  doctorName: String,
  date: String,
  time: String,
}));

// Mock data
const mockDoctors = [
  { name: 'Dr. John Doe', specialty: 'Cardiology' },
  { name: 'Dr. Jane Smith', specialty: 'Dermatology' },
  { name: 'Dr. Emily Johnson', specialty: 'Pediatrics' },
  { name: 'Dr. Michael Brown', specialty: 'Orthopedics' },
  { name: 'Dr. Sarah Wilson', specialty: 'Neurology' },
];

const mockAppointments = [
  { date: '2025-01-10', time: '10:00', doctorName: 'Dr. John Doe' },
  { date: '2025-01-10', time: '11:00', doctorName: 'Dr. Jane Smith' },
  { date: '2025-01-11', time: '14:00', doctorName: 'Dr. Emily Johnson' },
];

// Insert mock data into MongoDB
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Doctor.deleteMany();
    await Appointment.deleteMany();

    // Insert mock doctors
    const doctors = await Doctor.insertMany(mockDoctors);
    console.log('Doctors inserted:', doctors);

    // Insert mock appointments
    for (const appt of mockAppointments) {
      const doctor = doctors.find((doc) => doc.name === appt.doctorName);
      if (doctor) {
        await Appointment.create({
          doctorId: doctor._id,
          doctorName: doctor.name,
          date: appt.date,
          time: appt.time,
        });
      }
    }

    console.log('Appointments inserted successfully');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};

seedDatabase();
