const { Patient } = require("../models");
const { Op } = require("sequelize");

// Validación de los datos del paciente.
const validatePatientData = async (data) => {
  const { firstName, lastName, dni, email, phone } = data;

  if (!firstName || !lastName || !dni || !email || !phone) {
    throw new Error("Todos los campos son requeridos.");
  }

  // Validación del formato DNI | Entre 8 y 10 dígitos.
  if (!/^\d{8,10}$/.test(dni)) {
    throw new Error("El DNI debe tener entre 8 y 10 dígitos.");
  }

  // Validación del teléfono | Entre 8 y 10 dígitos.
  if (!/^\d{8,10}$/.test(phone)) {
    throw new Error("El teléfono debe tener 10 dígitos.");
  }

  //  Validación del formato Email.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("El formato del email no es válido.");
  }

  // Verificación DNI o Email, si ya están registrados en la base de datos o no.
  const existingPatient = await Patient.findOne({
    where: {
      [Op.or]: [{ dni }, { email }],
    },
  });

  if (existingPatient) {
    throw new Error("El DNI o email ya están registrados.");
  }
};

// Función para crear un paciente.
const createPatient = async (data) => {
  // Primero, valida los datos del paciente..
  await validatePatientData(data);

  // Si los datos son válidos, crea el paciente.
  const patient = await Patient.create(data);
  return patient;
};

module.exports = {
  createPatient,
};
