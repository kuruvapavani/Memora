import { auth, googleProvider } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
} from "firebase/auth";

// Register
export const register = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// Login
export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// Google Sign-in
export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

// Logout
export const logout = () => signOut(auth);

// Password Reset
export const sendPasswordResetEmail = (email) =>
  firebaseSendPasswordResetEmail(auth, email);
