const multer = require("multer");
const path = require("path");

// Configure multer for memory storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Allow JPG, PNG, and JPEG
  const allowedMimes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG/PNG files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit per file
  },
});

// Middleware for profile photo upload
const uploadProfilePhoto = upload.single("profilePhoto");

// Middleware for brand uploads (logo + up to 5 photos)
const uploadBrandFiles = upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "photos", maxCount: 5 },
]);

module.exports = {
  uploadProfilePhoto,
  uploadBrandFiles,
  upload,
};
