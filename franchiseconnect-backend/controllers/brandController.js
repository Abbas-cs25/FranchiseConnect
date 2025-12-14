// controllers/brandController.js
import asyncHandler from "express-async-handler";
import Brand from "../models/brandModel.js";
import mongoose from "mongoose";


export const createBrand = asyncHandler(async (req, res) => {
  const { name, category, description, location } = req.body;
  if (!req.user) { res.status(401); throw new Error("Not authorized"); }
  if (!name) { res.status(400); throw new Error("Brand name required"); }

  // file id from multer-gridfs-storage is at req.file.id
  let fileId = null;
  if (req.file && req.file.id) {
    fileId = req.file.id;
  }

  const brand = await Brand.create({
    owner: req.user._id,
    name, category, description, location,
    imageFileId: fileId
  });

  res.status(201).json({ message: "Brand created successfully", brand });
});

export const listBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find().populate("owner", "name email role");
  // convert imageFileId to imageUrl
  const mapped = brands.map(b => {
    const obj = b.toObject();
    if (obj.imageFileId) obj.imageUrl = `${req.protocol}://${req.get("host")}/api/uploads/${obj.imageFileId}`;
    return obj;
  });
  res.json(mapped);
});

export const getBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id).populate("owner", "name email role");
  if (!brand) { res.status(404); throw new Error("Brand not found"); }
  const obj = brand.toObject();
  if (obj.imageFileId) obj.imageUrl = `${req.protocol}://${req.get("host")}/api/uploads/${obj.imageFileId}`;
  res.json(obj);
});

export const approveBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) { res.status(404); throw new Error("Brand not found"); }
  brand.status = req.body.status || "approved";
  await brand.save();
  res.json({ message: "Brand status updated", brand });
});
