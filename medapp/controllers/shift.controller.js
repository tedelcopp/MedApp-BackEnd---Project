import { Shift, Patient } from "../models/index.js";

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
      return res.status(404).json({
        error:
          "Paciente no encontrado. Por favor, asegúrate de que el paciente existe.",
      });
    }

    const newShift = await Shift.create({
      patientId: existingPatient.id,
      date,
      time,
      phone,
      note,
    });

    res.status(201).json(newShift);
  } catch (error) {
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

    let updatedPatientId = shift.patientId;
    if (patient) {
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
        as: "PatientData",
        attributes: ["firstName", "lastName"],
      },
    });

    const formattedShifts = shifts.map((shift) => {
      const patientInfo = shift.PatientData;

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
        patient: patientName,
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
