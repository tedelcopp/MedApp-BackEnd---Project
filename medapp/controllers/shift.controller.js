import { Shift, Patient } from "../models/index.js";

// Lógica de validación movida y mejorada
const validateShiftData = (data) => {
  const { patientId, date, time } = data;
  if (!patientId || !date || !time) {
    throw new Error(
      "Los campos 'patientId', 'date' y 'time' son obligatorios."
    );
  }
};

export const createShiftHandler = async (req, res) => {
  try {
    const { patient, date, time, phone, note } = req.body;

    // 🚨 CORRECCIÓN EN BÚSQUEDA: Buscar al paciente por nombre completo exacto
    // Maneja nombres y apellidos compuestos
    const patientParts = patient.split(" ");
    const firstName = patientParts[0];
    // Se asegura de que el resto de las partes formen el apellido
    const lastName = patientParts.slice(1).join(" ");

    // 1. Busca al paciente por su nombre completo
    const existingPatient = await Patient.findOne({
      where: {
        firstName: firstName,
        lastName: lastName,
      },
    });

    if (!existingPatient) {
      // 2. Si el paciente no existe, devuelve un error 404
      return res.status(404).json({
        error:
          "Paciente no encontrado. Por favor, asegúrate de que el paciente existe.",
      });
    }

    // 3. Si se encuentra el paciente, crea el turno usando su ID
    const newShift = await Shift.create({
      patientId: existingPatient.id, // Mapea el ID del paciente al campo patientId
      date,
      time,
      phone,
      note,
    });

    // 4. Devuelve el nuevo turno creado
    res.status(201).json(newShift);
  } catch (error) {
    // 5. Captura y devuelve cualquier otro error
    console.error("Error al crear el turno:", error);
    res.status(400).json({ error: error.message });
  }
};

export const updateShiftHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { patient, date, time, phone, note } = req.body;

    const shift = await Shift.findByPk(id);
    if (!shift) {
      return res.status(404).json({ error: "Turno no encontrado." });
    }

    // Lógica para actualizar el patientId si el nombre del paciente ha cambiado
    let updatedPatientId = shift.patientId;
    if (patient) {
      // Mejorar la búsqueda para el apellido compuesto si aplica
      const patientParts = patient.split(" ");
      const firstName = patientParts[0];
      const lastName = patientParts.slice(1).join(" ");

      const existingPatient = await Patient.findOne({
        where: {
          firstName: firstName,
          lastName: lastName,
        },
      });

      if (!existingPatient) {
        return res.status(404).json({ error: "Paciente no encontrado." });
      }
      updatedPatientId = existingPatient.id;
    }

    const shiftData = {
      patientId: updatedPatientId,
      date,
      time,
      phone,
      note,
    };

    // Validamos la data final
    const validationData = {
      patientId: updatedPatientId,
      date: date || shift.date,
      time: time || shift.time,
    };
    validateShiftData(validationData);

    const updatedShift = await shift.update(shiftData);
    res.status(200).json(updatedShift);
  } catch (error) {
    console.error("Error al actualizar el turno:", error);
    res.status(400).json({ error: error.message });
  }
};

export const getAllShiftsHandler = async (req, res) => {
  try {
    const shifts = await Shift.findAll({
      include: {
        model: Patient,
        as: "PatientData", // <--- DEBE COINCIDIR CON EL ALIAS EN index.js
        attributes: ["firstName", "lastName"],
      },
    });

    const formattedShifts = shifts.map((shift) => {
      // 🚨 CORRECCIÓN CLAVE: Usamos el alias 'PatientData' para acceder a la data
      const patientInfo = shift.PatientData;

      // Manejo de seguridad en caso de que la relación no se cargue
      if (!patientInfo) {
        console.warn(`Shift ID ${shift.id} tiene datos de paciente faltantes.`);
        return {
          ...shift.toJSON(),
          patient: "Paciente Desconocido (ID: " + shift.patientId + ")",
        };
      }

      const patientName = `${patientInfo.firstName} ${patientInfo.lastName}`;

      return {
        ...shift.toJSON(),
        // Generamos el campo 'patient' para el frontend
        patient: patientName,
        // Eliminamos el objeto 'PatientData' anidado para limpiar la respuesta JSON
        PatientData: undefined,
      };
    });

    return res.status(200).json(formattedShifts);
  } catch (error) {
    console.error("Error al obtener los turnos:", error);
    return res.status(500).json({ error: "Error al obtener los turnos." });
  }
};

export const deleteShiftHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRows = await Shift.destroy({
      where: { id },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Turno no encontrado." });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar el turno:", error);
    res.status(500).json({ error: "Error al eliminar el turno." });
  }
};
