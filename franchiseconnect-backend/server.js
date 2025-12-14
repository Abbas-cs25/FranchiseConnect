// server.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
connectDB();


const app = express();
app.use(cors());
app.use(express.json()); // for JSON bodies

// routes
app.use("/api/auth", authRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/uploads", uploadRoutes);

// health
app.get("/", (req, res) => res.send("FranchiseConnect Backend Running"));

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


console.log("Mongo URI:mongodb+srv://abbaskhan:abbas846@franchisecluster.tsqon9c.mongodb.net/?appName=FranchiseCluster ", process.env.MONGO_URI);
