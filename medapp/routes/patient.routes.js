const express = require("express");
const { Patient } = require("../models");
const connection = require("../config/db"); 
const { createPatient } = require("../services/patient.service");
const { createPatientHandler } = require("../controllers/patient.controller");
const { validatePatientData } = require("../services/patient.service"); 

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los pacientes: " + error.message });
  }
});

router.post("/", createPatientHandler);

router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient)
      return res.status(404).json({
        message: "Paciente no encontrado con el ID: " + req.params.id,
      });
    res.json(patient);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener el paciente: " + error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient)
      return res.status(404).json({
        message: "Paciente no encontrado con el ID: " + req.params.id,
      });

    await validatePatientData(req.body);

    await patient.update(req.body);
    res.json({
      message: "Paciente actualizado exitosamente",
      patient: patient,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al actualizar el paciente: " + error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient)
      return res.status(404).json({
        message: "Paciente no encontrado con el ID: " + req.params.id,
      });

    await patient.destroy();
    res.json({ message: "Paciente eliminado exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar el paciente: " + error.message });
  }
});

module.exports = router;
