import express from "express";
import { getPatientById, addPatient } from "../controllers/patientController.js";
// import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", getPatientById);
router.post("/", addPatient);

export default router;
