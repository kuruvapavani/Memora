import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import admin from "../utils/firebaseAdmin.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token provided");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    const firebaseUid = decodedToken.uid;

    let user = await User.findOne({ uid: firebaseUid });

    if (!user) {
      user = await User.create({
        uid: firebaseUid,
        email: decodedToken.email,
        name: decodedToken.name || "Anonymous",
        emailVerified: decodedToken.email_verified || false,
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});
