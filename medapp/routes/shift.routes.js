import express from "express";
import {
  createShiftHandler,
  getAllShiftsHandler,
  updateShiftHandler,
  deleteShiftHandler,
} from "../controllers/shift.controller.js";

const router = express.Router();

router.get("/", getAllShiftsHandler);
router.post("/", createShiftHandler);
router.put("/:id", updateShiftHandler);
router.delete("/:id", deleteShiftHandler);

export default router;
