import { Patient } from "../models/index.js";
import { Op } from "sequelize";

// Validación de los datos del paciente.
export const validatePatientData = async (data) => {
  const { firstName, lastName, dni, email, phone, age } = data;

  if (
    !firstName ||
    !lastName ||
    !dni ||
    !email ||
    !phone ||
    !age === undefined
  ) {
    throw new Error("Todos los campos son requeridos.");
  }

  // Validación de la edad (debe estar entre 0 y 120 años).
  if (isNaN(age) || age < 1 || age > 120) {
    throw new Error("La edad debe ser un número entre 1 y 120.");
  }

  // Validación del formato DNI | Entre 8 y 10 dígitos.
  if (!/^\d{8,10}$/.test(dni)) {
    throw new Error("El DNI debe tener entre 8 y 10 dígitos.");
  }

  // Validación del teléfono | Entre 8 y 10 dígitos.
  if (!/^\+?\d{6,15}$/.test(phone)) {
    throw new Error("El teléfono debe tener entre 8 y 15 dígitos.");
  }

  // Validación del formato Email.
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

export async function createPatient(data) {
  try {
    await validatePatientData(data);
    const patient = await Patient.create(data);
    return patient;
  } catch (error) {
    console.error("Error al crear paciente:", error);
    throw new Error(error.message || "No se pudo crear el paciente");
  }
}
