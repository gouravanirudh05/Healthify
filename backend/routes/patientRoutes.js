import express from "express";
import { getPatientById, addPatient } from "../controllers/patientController.js";
import { getObservations, getConditions } from "../controllers/clinicalController.js";
// import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get/:id", getPatientById);
router.post("/add/", addPatient);
router.get("/getObservations/:id", getObservations);
router.get("/getConditions/:id", getConditions);

export default router;
