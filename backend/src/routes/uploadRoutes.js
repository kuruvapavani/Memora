import express from "express";
import multer from "multer";
import { uploadFile, uploadMultiple } from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/single", protect, upload.single("file"), uploadFile);
router.post("/multiple", protect, upload.array("files", 10), uploadMultiple);

export default router;
