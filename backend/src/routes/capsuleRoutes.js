import express from "express";
import { createCapsule, getUserCapsules, openCapsule } from "../controllers/capsuleController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createCapsule);
router.get("/", protect, getUserCapsules);
router.get("/:id/open", protect, openCapsule);

export default router;
