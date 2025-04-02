const { createPatient } = require("../services/patient.service");

const createPatientHandler = async (req, res) => {
  try {
    const patientData = req.body;
    const newPatient = await createPatient(patientData);
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPatientHandler,
};
