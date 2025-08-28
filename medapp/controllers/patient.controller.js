import { Patient } from "../models/index.js";
import {
  createPatient,
  validatePatientData,
} from "../services/patient.service.js";

export const getPatientsHandler = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los pacientes: " + error.message,
    });
  }
};

export const createPatientHandler = async (req, res) => {
  try {
    const patientData = req.body;
    const newPatient = await createPatient(patientData);
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPatientByIdHandler = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);

    if (!patient) {
      return res.status(404).json({
        message: "Paciente no encontrado con el ID: " + req.params.id,
      });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener el paciente: " + error.message,
    });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).json({
        message: "Paciente no encontrado con el ID: " + req.params.id,
      });
    }

    await validatePatientData(req.body);
    await patient.update(req.body);

    res.json({
      message: "Paciente actualizado exitosamente",
      patient,
    });
  } catch (error) {
    res.status(400).json({
      error: "Error al actualizar el paciente: " + error.message,
    });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).json({
        message: "Paciente no encontrado con el ID: " + req.params.id,
      });
    }

    await patient.destroy();
    res.json({ message: "Paciente eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar el paciente: " + error.message,
    });
  }
};
