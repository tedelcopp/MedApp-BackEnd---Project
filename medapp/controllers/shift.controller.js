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

    // 1. Busca al paciente por su nombre completo
    const existingPatient = await Patient.findOne({
      where: {
        // La lógica de búsqueda debe coincidir con cómo se guarda el nombre del paciente
        firstName: patient.split(" ")[0],
        lastName: patient.split(" ")[1],
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
      const existingPatient = await Patient.findOne({
        where: { firstName: patient },
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
    validateShiftData(shiftData);

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
        as: "Patient",
        attributes: ["firstName", "lastName"],
      },
    });

    const formattedShifts = shifts.map((shift) => {
      const patientName = `${shift.Patient.firstName} ${shift.Patient.lastName}`;
      return {
        ...shift.toJSON(),
        patient: patientName,
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
