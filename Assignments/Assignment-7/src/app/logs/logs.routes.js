import express from "express";

import { createLog } from "./logs.controller.js";

const router = express.Router();

router.post("/", createLog); // Route to create a log entry

export default router;