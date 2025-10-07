import { Patient } from "../models/index.js";
import { Op } from "sequelize";

/**
 * Valida y sanitiza los datos del paciente antes de la persistencia.
 * Convierte DNI y edad a números y verifica duplicados.
 * @param {object} data - Datos del paciente (incluye dni, email, etc.)
 * @param {number} [idToExclude=null] - ID del paciente si estamos actualizando (para ignorar ese ID en la búsqueda de duplicados).
 */
export const validatePatientData = async (data, idToExclude = null) => {
  const { firstName, lastName, dni, email, phone, age } = data;
  const dniAsNumber = Number(dni);
  const ageAsNumber = Number(age);

  // 1. Validación de campos obligatorios
  if (
    !firstName ||
    !lastName ||
    !dni ||
    !email ||
    !phone ||
    age === undefined ||
    age === null
  ) {
    throw new Error("ERROR_FALTA_CAMPO: Todos los campos son requeridos.");
  }

  // 2. Validación de Edad
  if (isNaN(ageAsNumber) || ageAsNumber < 1 || ageAsNumber > 120) {
    throw new Error(
      "ERROR_EDAD_INVALIDA: La edad debe ser un número entre 1 y 120."
    );
  }

  // 3. Validación de formato DNI (como string para la regex)
  if (!/^\d{7,10}$/.test(String(dni))) {
    throw new Error(
      "ERROR_DNI_FORMATO: El DNI debe tener entre 7 y 10 dígitos."
    );
  }

  // 4. Validación de que el DNI sea numérico
  if (isNaN(dniAsNumber) || dniAsNumber <= 0) {
    throw new Error("ERROR_DNI_NO_NUMERICO: El DNI no es un número válido.");
  }

  // 5. Validación de formato de Teléfono
  if (!/^\+?\d{6,15}$/.test(phone)) {
    throw new Error(
      "ERROR_TELEFONO_FORMATO: El teléfono debe tener entre 6 y 15 dígitos."
    );
  }

  // 6. Validación de formato de Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("ERROR_EMAIL_FORMATO: El formato del email no es válido.");
  }

  // 7. Configuración de la búsqueda de duplicados (DNI o email)
  const whereConditions = {
    [Op.or]: [{ dni: dniAsNumber }, { email }],
  };

  // Si estamos actualizando, ignoramos el ID del paciente actual en la búsqueda.
  if (idToExclude) {
    whereConditions.id = { [Op.ne]: idToExclude };
  }

  const existingPatient = await Patient.findOne({
    where: whereConditions,
  });

  // 8. Validación de Duplicados
  if (existingPatient) {
    // Si encontramos un paciente existente, determinamos si es por DNI o Email
    if (existingPatient.dni === dniAsNumber) {
      throw new Error(
        "ERROR_DNI_DUPLICADO: El DNI ya está registrado por otro paciente."
      );
    }
    if (existingPatient.email === email) {
      throw new Error(
        "ERROR_EMAIL_DUPLICADO: El email ya está registrado por otro paciente."
      );
    }
    // Caso de seguridad, si pasa el Op.or pero no coincide exactamente por alguna razón
    throw new Error(
      "ERROR_DUPLICADO_GENERAL: El DNI o email ya están registrados."
    );
  }

  // 9. SANITIZACIÓN: Aseguramos que el objeto de datos use números para la DB
  data.dni = dniAsNumber;
  data.age = ageAsNumber;
};

export async function createPatient(data) {
  try {
    // Se ejecuta validatePatientData (que convierte DNI a número y valida)
    await validatePatientData(data);

    // Y aquí se crea el paciente con el DNI ya convertido
    const patient = await Patient.create(data);
    return patient;
  } catch (error) {
    console.error("Error al crear paciente:", error);
    // Devolvemos el mensaje de error específico, incluyendo los nuevos códigos (ERROR_...)
    throw new Error(error.message || "No se pudo crear el paciente");
  }
}
