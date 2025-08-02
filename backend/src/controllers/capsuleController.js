import Capsule from "../models/Capsule.js";

export const createCapsule = async (req, res) => {
  try {
    const { title, text, media, openDate, friends } = req.body;

    if (!title || !openDate || !friends || friends.length === 0) {
      return res.status(400).json({ message: "Title, open date, and friends are required." });
    }

    const formattedFriends = friends.map(friend => ({
      email: friend.email,
      verified: false
    }));

    const capsule = await Capsule.create({
      title,
      text,
      media: {
        images: media?.images || [],
        videos: media?.videos || [],
        voiceMessages: media?.voiceMessages || []
      },
      openDate,
      creator: req.user._id,
      friends: formattedFriends
    });

    res.status(201).json({
      message: "Capsule created successfully",
      capsule
    });
  } catch (error) {
    console.error("Error creating capsule:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

