// import { db } from "../config/firebase.js";
import axios from "axios";

const FHIR_BASE_URL = 'https://hapi.fhir.org/baseR4';

export const getPatientById = async (req, res) => {
  try {
      const { id } = req.params;
      const response = await axios.get(`${FHIR_BASE_URL}/Patient/${id}`);
      res.status(200).json(response.data);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

export const addPatient = async (req, res) => {
  try {
      const patientData = req.body;
      const response = await axios.post(`${FHIR_BASE_URL}/Patient`, patientData);
      res.status(201).json(response.data);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

