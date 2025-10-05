// src/controllers/uploadController.js
import asyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import { v4 as uuidv4 } from "uuid";

export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto", public_id: uuidv4() },
        (error, uploadResult) => {
          if (error) reject(error);
          else resolve(uploadResult);
        }
      );
      stream.end(req.file.buffer);
    });

    res.json({ url: result.secure_url });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500);
    throw new Error("File upload failed");
  }
});

export const uploadMultiple = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error("No files uploaded");
  }

  try {
    const urls = [];

    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto", public_id: uuidv4() },
          (error, uploadResult) => {
            if (error) reject(error);
            else resolve(uploadResult);
          }
        );
        stream.end(file.buffer);
      });
      urls.push(result.secure_url);
    }

    res.json({ urls });
  } catch (err) {
    console.error("Multiple upload error:", err);
    res.status(500);
    throw new Error("Multiple file upload failed");
  }
});
