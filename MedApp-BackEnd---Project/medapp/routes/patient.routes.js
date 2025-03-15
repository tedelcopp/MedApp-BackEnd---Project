const express = require("express");
const { Patient } = require("../models");

const router = express.Router();

// Obtener todos los pacientes
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un paciente
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, dni, email, phone } = req.body;
    const patient = await Patient.create({
      firstName,
      lastName,
      dni,
      email,
      phone,
    });
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un paciente por ID
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient)
      return res.status(404).json({ message: "Paciente no encontrado" });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un paciente
router.put("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient)
      return res.status(404).json({ message: "Paciente no encontrado" });

    await patient.update(req.body);
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un paciente
router.delete("/:id", async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient)
      return res.status(404).json({ message: "Paciente no encontrado" });

    await patient.destroy();
    res.json({ message: "Paciente eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
