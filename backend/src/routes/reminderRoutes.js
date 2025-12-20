import express from "express";
import Capsule from "../models/Capsule.js";
import sendEmail from "../utils/sendEmail.js";
import reminderEmailTemplate from "../utils/email-templates/reminderEmailTemplate.js";

const router = express.Router();


router.get("/send", async (req, res) => {
  try {
    console.log("🔔 Reminder cron triggered (Vercel)");

    const now = new Date();

    const tomorrow = new Date(now);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

    const start = new Date(tomorrow);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(tomorrow);
    end.setUTCHours(23, 59, 59, 999);

    const capsules = await Capsule.find({
      openDate: { $gte: start, $lte: end }
    })
      .populate("creator")
      .lean();

    let emailsSent = 0;

    for (const capsule of capsules) {
      // Creator reminder
      if (capsule.creator?.email) {
        await sendEmail(
          capsule.creator.email,
          "⏳ Your Memora Capsule Opens Tomorrow!",
          reminderEmailTemplate(
            capsule.creator.name || "there",
            capsule.title,
            new Date(capsule.openDate).toDateString()
          )
        );
        emailsSent++;
      }

      // Friends reminder
      if (capsule.friends?.length) {
        for (const friend of capsule.friends) {
          if (!friend.email) continue;

          await sendEmail(
            friend.email,
            "⏳ A Memora Capsule Opens Tomorrow!",
            reminderEmailTemplate(
              friend.name || "Friend",
              capsule.title,
              new Date(capsule.openDate).toDateString()
            )
          );
          emailsSent++;
        }
      }
    }

    return res.status(200).json({
      success: true,
      capsulesFound: capsules.length,
      emailsSent
    });
  } catch (error) {
    console.error("❌ Reminder cron failed:", error);
    return res.status(500).json({ error: "Reminder failed" });
  }
});

export default router;
