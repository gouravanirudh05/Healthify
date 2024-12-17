import { db } from "../config/firebase.js";

export const getAppointments = async (req, res) => {
  try {
    const snapshot = await db.collection("appointments").get();
    const appointments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const appointmentData = req.body;
    const newAppointmentRef = db.collection("appointments").doc();
    await newAppointmentRef.set(appointmentData);

    res.status(201).json({ message: "Appointment created successfully", id: newAppointmentRef.id });
  } catch (error) {
    res.status(500).json({ message: "Error creating appointment", error });
  }
};
