import express from "express";
import { createShiftHandler } from "../controllers/shift.controller.js";

const router = express.Router();

router.post("/", createShiftHandler);

export default router;
