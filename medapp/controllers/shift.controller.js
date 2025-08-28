import { createShift } from "../services/shift.service.js";

export const createShiftHandler = async (req, res) => {
  try {
    const shiftData = req.body;
    const newShift = await createShift(shiftData);
    res.status(201).json(newShift);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
