import express from "express";
import { createCapsule } from "../controllers/capsuleController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createCapsule);

export default router;
