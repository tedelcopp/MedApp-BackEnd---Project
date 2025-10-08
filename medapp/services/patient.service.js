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

  // --- CAMBIOS REALIZADOS AQUÍ (Pasos 7 y 8) ---

  // 7. Configuración de la exclusión: si se proporciona un ID, se agrega la condición
  // [Op.ne] (Not Equal) a la cláusula where.
  const idExclusionCondition = idToExclude
    ? { id: { [Op.ne]: idToExclude } }
    : {};

  // 8. Búsqueda de Duplicados
  const existingPatient = await Patient.findOne({
    where: {
      [Op.and]: [
        // Excluir el paciente que estamos editando (si aplica)
        idExclusionCondition,
        // Buscar DNI o Email duplicado
        {
          [Op.or]: [{ dni: dniAsNumber }, { email }],
        },
      ],
    },
  });

  // 9. Validación de Duplicados (ahora si existingPatient existe, ES un duplicado de OTRA persona)
  if (existingPatient) {
    const isDniDuplicated = existingPatient.dni === dniAsNumber;
    const isEmailDuplicated = existingPatient.email === email;

    if (isDniDuplicated) {
      throw new Error(
        "ERROR_DNI_DUPLICADO: El DNI ya está registrado por el paciente ID " +
          existingPatient.id
      );
    }
    if (isEmailDuplicated) {
      throw new Error(
        "ERROR_EMAIL_DUPLICADO: El email ya está registrado por el paciente ID " +
          existingPatient.id
      );
    }
    // Fallback (aunque no debería ocurrir si las condiciones anteriores son correctas)
    throw new Error(
      "ERROR_DUPLICADO_GENERAL: El DNI o email ya están registrados."
    );
  }
  // --- FIN DE LOS CAMBIOS ---

  // 10. SANITIZACIÓN: Aseguramos que el objeto de datos use números para la DB
  data.dni = dniAsNumber;
  data.age = ageAsNumber;
};

export async function createPatient(data) {
  try {
    // Se ejecuta validatePatientData (que convierte DNI a número y valida)
    // Aquí validatePatientData se llama sin idToExclude (null), por lo que no se excluye a nadie.
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
