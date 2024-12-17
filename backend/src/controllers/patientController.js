import { db } from "../config/firebase.js";

export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patientDoc = await db.collection("patients").doc(id).get();

    if (!patientDoc.exists) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patientDoc.data());
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient data", error });
  }
};

export const addPatient = async (req, res) => {
  try {
    const patientData = req.body;
    const newPatientRef = db.collection("patients").doc();
    await newPatientRef.set(patientData);

    res.status(201).json({ message: "Patient added successfully", id: newPatientRef.id });
  } catch (error) {
    res.status(500).json({ message: "Error adding patient", error });
  }
};
