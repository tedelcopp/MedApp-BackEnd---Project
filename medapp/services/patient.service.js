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

  // 7. Configuración de la búsqueda de duplicados (BÚSQUEDA SIMPLE, SIN EXCLUSIÓN DE ID AÚN)
  const existingPatient = await Patient.findOne({
    where: {
      [Op.or]: [{ dni: dniAsNumber }, { email }],
    },
  });

  // 8. Validación de Duplicados (FILTRANDO EN JAVASCRIPT)
  if (existingPatient) {
    // Si estamos en modo edición (idToExclude) Y el paciente encontrado es el mismo que estamos editando,
    // NO es un duplicado, y simplemente salimos del if.
    if (idToExclude && existingPatient.id === idToExclude) {
      // El paciente existente es el mismo que estamos actualizando, no hay duplicado.
    } else {
      // En este punto, SÍ es un duplicado de otro paciente (o de sí mismo en modo creación)
      const existingDniString = String(existingPatient.dni);
      const newDniString = String(dniAsNumber);

      if (existingDniString === newDniString) {
        throw new Error(
          "ERROR_DNI_DUPLICADO: El DNI ya está registrado por el paciente ID " +
            existingPatient.id
        );
      }
      if (existingPatient.email === email) {
        throw new Error(
          "ERROR_EMAIL_DUPLICADO: El email ya está registrado por el paciente ID " +
            existingPatient.id
        );
      }
      // Fallback si la coincidencia es ambigua
      throw new Error(
        "ERROR_DUPLICADO_GENERAL: El DNI o email ya están registrados."
      );
    }
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
    // Devolvemos el mensaje de error específico (ERROR_...)
    throw new Error(error.message || "No se pudo crear el paciente");
  }
}
