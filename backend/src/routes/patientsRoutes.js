import express from "express";
import { getPatientById, addPatient } from "../controllers/patientController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", verifyToken, getPatientById);
router.post("/", verifyToken, addPatient);

export default router;
