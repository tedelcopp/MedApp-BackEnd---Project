import express from "express";
import {
  getPatientsHandler,
  createPatientHandler,
  getPatientByIdHandler,
  updatePatient,
  deletePatient,
} from "../controllers/patient.controller.js";

const router = express.Router();

router.get("/", getPatientsHandler);
router.post("/", createPatientHandler);
router.get("/:id", getPatientByIdHandler);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;
