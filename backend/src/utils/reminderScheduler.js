import cron from "node-cron";
import Capsule from "../models/Capsule.js";
import sendEmail from "../utils/sendEmail.js";
import reminderEmailTemplate from "./email-templates/reminderEmailTemplate.js";

cron.schedule("0 21 * * *", async () => {
  console.log("🔔 Running reminder scheduler...");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const start = new Date(tomorrow.setHours(0, 0, 0, 0));
  const end = new Date(tomorrow.setHours(23, 59, 59, 999));

  const capsules = await Capsule.find({
    openDate: { $gte: start, $lte: end }
  }).populate("creator");

  for (const capsule of capsules) {
    await sendEmail(
      capsule.creator.email,
      "⏳ Your Memora Capsule Opens Tomorrow!",
      reminderEmailTemplate(
        capsule.creator.name || "there",
        capsule.title,
        capsule.openDate.toDateString()
      )
    );

    for (const friend of capsule.friends) {
      await sendEmail(
        friend.email,
        "⏳ A Memora Capsule Opens Tomorrow!",
        reminderEmailTemplate(
          friend.name || "Friend",
          capsule.title,
          capsule.openDate.toDateString()
        )
      );
    }
  }

  console.log("✅ Reminder emails sent successfully");
});
