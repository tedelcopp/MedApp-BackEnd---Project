import { Patient } from "../models/index.js";
import { Op } from "sequelize";

/**
 * Valida y sanitiza los datos del paciente antes de la persistencia.
 * Convierte DNI y edad a números y verifica duplicados.
 * * @param {object} data - Datos del paciente (incluye dni, email, etc.)
 * @param {number} [idToExclude=null] - ID del paciente si estamos actualizando (para ignorar ese ID en la búsqueda de duplicados).
 */
export const validatePatientData = async (data, idToExclude = null) => {
  const { firstName, lastName, dni, email, phone, age } = data; // Conversión segura a número
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
  } // Validar el formato del DNI (aún como string para la regex)
  if (!/^\d{7,10}$/.test(String(dni))) {
    // Usamos 7-10 por si hay algún DNI viejo o pre-formateado
    throw new Error("El DNI debe tener entre 7 y 10 dígitos.");
  } // Verificar que el DNI sea un número válido antes de usarlo en la DB
  if (isNaN(dniAsNumber) || dniAsNumber <= 0) {
    throw new Error("El DNI no es un número válido.");
  }

  if (!/^\+?\d{6,15}$/.test(phone)) {
    throw new Error("El teléfono debe tener entre 6 y 15 dígitos.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("El formato del email no es válido.");
  }

  // Condición base para buscar duplicados (DNI o email)
  const whereConditions = {
    [Op.or]: [{ dni: dniAsNumber }, { email }],
  };

  // 🚨 CORRECCIÓN CLAVE: Permitir la edición
  // Si estamos actualizando, ignoramos el ID del paciente actual en la búsqueda de duplicados.
  if (idToExclude) {
    whereConditions.id = { [Op.ne]: idToExclude }; // Op.ne = Not Equal
  }

  const existingPatient = await Patient.findOne({
    where: whereConditions,
  });

  if (existingPatient) {
    throw new Error("El DNI o email ya están registrados.");
  } // 🚨 SANITIZACIÓN: Aseguramos que el objeto de datos use números para la DB

  data.dni = dniAsNumber;
  data.age = ageAsNumber;
};

export async function createPatient(data) {
  try {
    // Se ejecuta validatePatientData (que convierte DNI a número)
    await validatePatientData(data);

    // Y aquí se crea el paciente con el DNI ya convertido
    const patient = await Patient.create(data);
    return patient;
  } catch (error) {
    console.error("Error al crear paciente:", error);
    throw new Error(error.message || "No se pudo crear el paciente");
  }
}
