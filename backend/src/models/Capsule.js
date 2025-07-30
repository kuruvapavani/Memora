import mongoose from "mongoose";

const capsuleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    media: {
      images: [String],
      videos: [String],
      voiceMessages: [String],
    },
    openDate: {
      type: Date,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    friends: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        verified: { type: Boolean, default: false },
      },
    ],
    status: {
      type: String,
      enum: ["locked", "opened"],
      default: "locked",
    },
  },
  { timestamps: true }
);

const Capsule = mongoose.model("Capsule", capsuleSchema);
export default Capsule;
