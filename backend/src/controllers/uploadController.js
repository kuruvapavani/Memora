import s3 from "../utils/s3.js";

export const uploadSingle = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file provided" });

    const file = req.file;
    const key = `capsules/${Date.now()}-${file.originalname}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const data = await s3.upload(params).promise();

    return res.status(200).json({ url: data.Location, key: data.Key });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

export const uploadMultiple = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files provided" });
    }

    const uploadPromises = req.files.map((file) => {
      const key = `capsules/${Date.now()}-${file.originalname}`;
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      };
      return s3.upload(params).promise();
    });

    const results = await Promise.all(uploadPromises);
    const urls = results.map((r) => ({ url: r.Location, key: r.Key }));
    return res.status(200).json({ files: urls });
  } catch (error) {
    console.error("Upload multiple error:", error);
    return res.status(500).json({ message: "Upload failed", error: error.message });
  }
};
