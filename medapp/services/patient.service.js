import { Patient } from "../models/index.js";
import { Op } from "sequelize";

export const validatePatientData = async (data) => {
  const { firstName, lastName, dni, email, phone, age } = data; // 🚨 CORRECCIÓN CLAVE: CONVERTIR DNI Y AGE A NÚMEROS DE FORMA SEGURA

  const dniAsNumber = Number(dni);
  const ageAsNumber = Number(age);

  if (
    !firstName ||
    !lastName ||
    !dni ||
    !email ||
    !phone ||
    age === undefined ||
    age === null
  ) {
    throw new Error("Todos los campos son requeridos.");
  }

  if (isNaN(ageAsNumber) || ageAsNumber < 1 || ageAsNumber > 120) {
    throw new Error("La edad debe ser un número entre 1 y 120.");
  }
  // Validar el formato del DNI (aún como string para la regex)
  if (!/^\d{8,10}$/.test(dni)) {
    throw new Error("El DNI debe tener entre 8 y 10 dígitos.");
  }
  // Verificar que el DNI sea un número válido antes de usarlo en la DB
  if (isNaN(dniAsNumber) || dniAsNumber <= 0) {
    throw new Error("El DNI no es un número válido.");
  }

  if (!/^\+?\d{6,15}$/.test(phone)) {
    throw new Error("El teléfono debe tener entre 8 y 15 dígitos.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("El formato del email no es válido.");
  }

  const existingPatient = await Patient.findOne({
    where: {
      [Op.or]: [{ dni: dniAsNumber }, { email }], // 👈 USAMOS dniAsNumber AQUÍ
    },
  });

  if (existingPatient) {
    throw new Error("El DNI o email ya están registrados.");
  }

  // 🚨 NOTA: DEBES ASEGURARTE DE QUE LA FUNCIÓN createPatient
  // O LA RUTA DE EXPRESS USE EL DNI CONVERTIDO A NÚMERO
  // ANTES DE HACER Patient.create(data).
  data.dni = dniAsNumber;
  data.age = ageAsNumber;
};

export async function createPatient(data) {
  try {
    // validatePatientData ahora convierte dni y age a números DENTRO del objeto data
    await validatePatientData(data); // Patient.create(data) ahora recibe dni y age como números
    const patient = await Patient.create(data);
    return patient;
  } catch (error) {
    console.error("Error al crear paciente:", error);
    throw new Error(error.message || "No se pudo crear el paciente");
  }
}
