import Brand from "../models/brandModel.js";

export const createBrand = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const data = req.body;
    data.owner = ownerId;
    // if images uploaded via multer-cloudinary, they are in req.files
    if (req.files && req.files.length) {
      data.gallery = req.files.map(f => f.path || f.filename || f.url);
      if (!data.logo) data.logo = data.gallery[0];
    }
    const brand = await Brand.create(data);
    res.status(201).json(brand);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const listBrands = async (req, res) => {
  try {
    const { page=1, limit=10, q } = req.query;
    const filter = {};
    if (q) filter.$text = { $search: q };
    const brands = await Brand.find(filter).skip((page-1)*limit).limit(Number(limit)).populate("owner","name email");
    res.json({ page, data: brands });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const getBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id).populate("owner","name email");
    if (!brand) return res.status(404).json({ message: "Not found" });
    brand.views = (brand.views || 0) + 1;
    await brand.save();
    res.json(brand);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const approveBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: "Not found" });
    brand.status = req.body.status || "approved";
    await brand.save();
    res.json(brand);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
