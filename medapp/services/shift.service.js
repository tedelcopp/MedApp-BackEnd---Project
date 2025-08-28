import { Shift, Patient } from "../models/index.js";

const validateShifttData = async (data) => {
  const { patientId, date, time, phone, note } = data;

  if (!patientId) {
    throw new Error("El paciente es requerido.");
  }

  const patient = await Patient.findByPk(patientId);
  if (!patient) {
    throw new Error("El paciente no existe.");
  }

  if (!date) {
    throw new Error("La fecha es requerida.");
  }
  const shiftDate = new Date(date);
  if (isNaN(shiftDate.getTime())) {
    throw new Error("La fecha no es válida.");
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (shiftDate < today) {
    throw new Error("No se pueden asignar turnos en el pasado.");
  }

  if (!time) {
    throw new Error("La hora es requerida.");
  }
  if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
    throw new Error("La hora debe estar en formato HH:mm (24 horas).");
  }

  if (phone && !/^\+?\d{6,15}$/.test(phone)) {
    throw new Error("El teléfono debe tener entre 6 y 15 dígitos.");
  }

  if (note && note.length > 255) {
    throw new Error("La nota no puede superar los 255 caracteres.");
  }

  const existingShift = await Shift.findOne({
    where: {
      patientId,
      date,
      time,
    },
  });

  if (existingShift) {
    throw new Error(
      "El paciente ya tiene un turno asignado en esa fecha y hora."
    );
  }
};

export async function createShift(data) {
  try {
    await validateShiftData(data);
    const shift = await Shift.create(data);
    return shift;
  } catch (error) {
    console.error("Error al crear turno:", error);
    throw new Error(error.message || "No se pudo crear el turno");
  }
}
