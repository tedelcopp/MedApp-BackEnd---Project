const express = require("express");
const { Patient } = require("../models");
const { createPatient } = require("../services/patient.service");
const { createPatientHandler } = require("../controllers/patient.controller");
const { validatePatientData } = require("../services/patient.service"); // Asegúrate de tener este servicio

const router = express.Router();

// Obtener todos los pacientes
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

// Crear un paciente
router.post("/", createPatientHandler);

// Obtener un paciente por ID
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

// Actualizar un paciente
router.put("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient)
      return res.status(404).json({
        message: "Paciente no encontrado con el ID: " + req.params.id,
      });

    // Validar los datos antes de actualizar
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

// Eliminar un paciente
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
