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

export const getUserCapsules = async (req, res) => {
  try {
    const userEmail = req.user.email;

    const capsules = await Capsule.find({
      $or: [
        { creator: req.user._id },
        { "friends.email": userEmail }
      ]
    }).sort({ openDate: 1 });

    res.status(200).json({ capsules });
  } catch (error) {
    console.error("Error fetching capsules:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const openCapsule = async (req, res) => {
  try {
    const { id } = req.params;
    const capsule = await Capsule.findById(id);

    if (!capsule) {
      return res.status(404).json({ message: "Capsule not found" });
    }

    const isCreator = capsule.creator.toString() === req.user._id.toString();
    const isFriend = capsule.friends.some(f => f.email === req.user.email);

    if (!isCreator && !isFriend) {
      return res.status(403).json({ message: "You are not allowed to open this capsule." });
    }

    if (new Date() < new Date(capsule.openDate)) {
      return res.status(403).json({ message: "Capsule cannot be opened before the open date." });
    }

    if (capsule.status === "locked") {
      capsule.status = "opened";
      await capsule.save();
    }

    res.status(200).json({ message: "Capsule opened successfully", capsule });
  } catch (error) {
    console.error("Error opening capsule:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
