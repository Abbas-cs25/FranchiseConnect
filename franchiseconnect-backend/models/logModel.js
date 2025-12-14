import mongoose from "mongoose";
const logSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: String,
  details: Object
}, { timestamps: true });

export default mongoose.model("Log", logSchema);
