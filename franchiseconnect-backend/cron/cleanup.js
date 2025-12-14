// run with node cron/cleanup.js using cronjob or PM2 schedule
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Brand from "../models/brandModel.js";

const run = async () => {
  await connectDB();
  // example: remove brands in 'rejected' older than 90 days
  const cutoff = new Date(Date.now() - 90*24*60*60*1000);
  const res = await Brand.deleteMany({ status: "rejected", updatedAt: { $lt: cutoff }});
  console.log("Cleanup done:", res.deletedCount);
  process.exit();
};

run().catch(err => console.error(err));
