import dotenv from "dotenv";
import admin from "firebase-admin";
dotenv.config();

let serviceAccount;

try {
  const keyString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!keyString) throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is missing.");
  serviceAccount = JSON.parse(keyString);
} catch (error) {
  console.error("🔥 ERROR parsing Firebase key:", error.message);
  process.exit(1);
}

if (serviceAccount && admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("🔥 Firebase Admin initialized.");
} else if (admin.apps.length > 0) {
  console.log("🔥 Firebase Admin already initialized.");
}

export default admin;
