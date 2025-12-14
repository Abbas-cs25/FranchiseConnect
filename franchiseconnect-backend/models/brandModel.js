// models/Brand.js
import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  location: { type: String },
  status: { type: String, enum: ["pending","approved","rejected"], default: "pending" },
  imageFileId: { type: mongoose.Schema.Types.ObjectId }, // GridFS file id
}, { timestamps: true });

export default mongoose.model("Brand", brandSchema);
