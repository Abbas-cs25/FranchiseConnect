// controllers/uploadController.js
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";


// upload handled by multer-gridfs-storage; this returns file id in req.file.id
export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) { res.status(400); throw new Error("No file uploaded"); }
  res.json({ fileId: req.file.id, filename: req.file.filename });
});

// stream file from GridFS
export const getImage = asyncHandler(async (req, res) => {
  const gfs = getGFS();
  if (!gfs) { res.status(500); throw new Error("GridFS not initialized"); }

  const fileId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(fileId)) { res.status(400); throw new Error("Invalid file id"); }

  gfs.files.findOne({ _id: mongoose.Types.ObjectId(fileId) }, (err, file) => {
    if (!file || file.length === 0) { return res.status(404).json({ message: "No file found" }); }
    const readstream = gfs.createReadStream({ _id: file._id });
    res.set("Content-Type", file.contentType || "application/octet-stream");
    readstream.on("error", (err) => { res.status(500).json({ message: "Read stream error" }); });
    readstream.pipe(res);
  });
});
