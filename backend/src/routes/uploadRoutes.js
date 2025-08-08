import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadSingle, uploadMultiple } from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/single", protect, upload.single("file"), uploadSingle);
router.post("/multiple", protect, upload.array("files", 10), uploadMultiple);

export default router;
