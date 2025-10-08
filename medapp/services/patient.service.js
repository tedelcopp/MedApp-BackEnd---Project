import { Patient } from "../models/index.js";
import { Op } from "sequelize";

/**
@param {object} data
@param {number} [idToExclude=null] 
*/
export const validatePatientData = async (data, idToExclude = null) => {
  const { firstName, lastName, dni, email, phone, age } = data;
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
    throw new Error("ERROR_FALTA_CAMPO: Todos los campos son requeridos.");
  }

  if (isNaN(ageAsNumber) || ageAsNumber < 1 || ageAsNumber > 120) {
    throw new Error(
      "ERROR_EDAD_INVALIDA: La edad debe ser un número entre 1 y 120."
    );
  }

  if (!/^\d{7,10}$/.test(String(dni))) {
    throw new Error(
      "ERROR_DNI_FORMATO: El DNI debe tener entre 7 y 10 dígitos."
    );
  }

  if (isNaN(dniAsNumber) || dniAsNumber <= 0) {
    throw new Error("ERROR_DNI_NO_NUMERICO: El DNI no es un número válido.");
  }

  if (!/^\+?\d{6,15}$/.test(phone)) {
    throw new Error(
      "ERROR_TELEFONO_FORMATO: El teléfono debe tener entre 6 y 15 dígitos."
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("ERROR_EMAIL_FORMATO: El formato del email no es válido.");
  }

  const idExclusionCondition = idToExclude
    ? { id: { [Op.ne]: idToExclude } }
    : {};

  const existingPatient = await Patient.findOne({
    where: {
      [Op.and]: [
        idExclusionCondition,
        {
          [Op.or]: [{ dni: dniAsNumber }, { email }],
        },
      ],
    },
  });

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
    throw new Error(
      "ERROR_DUPLICADO_GENERAL: El DNI o email ya están registrados."
    );
  }

  data.dni = dniAsNumber;
  data.age = ageAsNumber;
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
