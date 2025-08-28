import express from "express";
import patientRoutes from "./patient.routes.js";
import shiftRoutes from "./shift.routes.js";

const router = express.Router();

router.use("/patients", patientRoutes);
router.use("/shifts", shiftRoutes);

export default router;
