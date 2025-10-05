import User from "../models/User.js";
import admin from "../utils/firebaseAdmin.js";

export const firebaseSignIn = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    let firebaseUser;
    try {
      firebaseUser = await admin.auth().getUserByEmail(email);
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        firebaseUser = await admin.auth().createUser({
          email,
          password,
          displayName: name || "Anonymous",
        });
      } else {
        throw err;
      }
    }

    let user = await User.findOne({ uid: firebaseUser.uid });

    if (!user) {
      user = await User.create({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || "Anonymous",
      });
      return res.status(201).json({
        message: "User created in Firebase and MongoDB",
        user,
      });
    }

    res.json({
      message: "User already exists, synchronized successfully",
      user,
    });
  } catch (error) {
    console.error("Firebase sign-in error:", error);
    res.status(500).json({
      message: "Server error during Firebase signup/signin",
      error: error.message,
    });
  }
};
