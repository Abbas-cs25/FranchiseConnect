// middleware/uploadMiddleware.js
import multer from "multer";
import crypto from "crypto";
import path from "path";

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) throw new Error("MONGO_URI missing");

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
    return {
      bucketName: "uploads",
      filename,
    };
  },
});

const upload = multer({ storage });

export default upload;
