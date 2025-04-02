const express = require("express");
const router = express.Router();

const patientRoutes = require("./patient.routes");

router.use("/patients", patientRoutes);

module.exports = router;
