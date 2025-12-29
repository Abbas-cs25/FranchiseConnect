const Brand = require("../models/brandModel");
const User = require("../models/userModel");

// CREATE BRAND
exports.createBrand = async (req, res) => {
  try {
    const {
      brandName,
      category,
      subCategory,
      areaRequired,
      franchiseOutlets,
      locations,
      establishedYear,
      aboutBrand,
      operationCommencedOn,
      franchiseCommencedOn,
      brandFee,
      anticipatedReturn,
      paybackPeriod,
      otherInvestmentRequirements,
      expansionPlans,
      propertyTypeRequired,
      headOfficeLocation,
      transferPeriod,
      isTermRenewable,
    } = req.body;

    // Parse investmentRange from FormData format
    let investmentRange = {
      min: 100000,
      max: 1000000000
    };

    if (req.body["investmentRange[min]"] || req.body["investmentRange[max]"]) {
      investmentRange = {
        min: parseFloat(req.body["investmentRange[min]"]) || 100000,
        max: parseFloat(req.body["investmentRange[max]"]) || 1000000000,
      };
    }

    // Validate required fields
    if (!brandName || !category || !subCategory) {
      return res.status(400).json({ message: "Brand name, category, and subcategory are required" });
    }

    // Handle file uploads (logo and photos)
    let logo = null;
    let photos = [];

    if (req.files) {
      if (req.files.logo && req.files.logo[0]) {
        logo = {
          data: req.files.logo[0].buffer,
          contentType: req.files.logo[0].mimetype,
        };
      }

      if (req.files.photos) {
        photos = req.files.photos.slice(0, 5).map((file) => ({
          data: file.buffer,
          contentType: file.mimetype,
        }));
      }
    }

    const brand = new Brand({
      ownerId: req.user.userId,
      brandName,
      logo,
      photos,
      category,
      subCategory,
      investmentRange,
      areaRequired,
      franchiseOutlets,
      locations: Array.isArray(locations) ? locations : [locations],
      establishedYear,
      aboutBrand,
      operationCommencedOn: new Date(operationCommencedOn),
      franchiseCommencedOn: new Date(franchiseCommencedOn),
      brandFee,
      anticipatedReturn,
      paybackPeriod,
      otherInvestmentRequirements,
      expansionPlans,
      propertyTypeRequired,
      headOfficeLocation,
      transferPeriod,
      isTermRenewable: isTermRenewable === "true" || isTermRenewable === true,
    });

    await brand.save();

    res.status(201).json({
      message: "Brand created successfully",
      brand: {
        ...brand.toObject(),
        logo: logo ? `data:${logo.contentType};base64,${logo.data.toString("base64")}` : null,
        photos: photos.map((p) => `data:${p.contentType};base64,${p.data.toString("base64")}`),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL BRANDS
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find({ isActive: true }).populate("ownerId", "firstName lastName email mobile");

    const brandsWithImages = brands.map((brand) => {
      const brandObj = brand.toObject();
      return {
        ...brandObj,
        investmentRange: brandObj.investmentRange || { min: 0, max: 0 },
        logo: brand.logo && brand.logo.data ? `data:${brand.logo.contentType};base64,${brand.logo.data.toString("base64")}` : null,
        photos: brand.photos.map((photo) =>
          photo && photo.data ? `data:${photo.contentType};base64,${photo.data.toString("base64")}` : null
        ),
      };
    });

    res.status(200).json({
      brands: brandsWithImages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BRAND BY ID
exports.getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id).populate("ownerId", "firstName lastName email mobile state city");

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // Increment view count
    brand.viewCount = (brand.viewCount || 0) + 1;
    await brand.save();

    const brandObj = brand.toObject();
    const brandData = {
      ...brandObj,
      investmentRange: brandObj.investmentRange || { min: 0, max: 0 },
      logo: brand.logo && brand.logo.data ? `data:${brand.logo.contentType};base64,${brand.logo.data.toString("base64")}` : null,
      photos: brand.photos.map((photo) =>
        photo && photo.data ? `data:${photo.contentType};base64,${photo.data.toString("base64")}` : null
      ),
    };

    res.status(200).json({
      brand: brandData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE BRAND
exports.updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // Check if user is the owner
    if (brand.ownerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to update this brand" });
    }

    // Parse investmentRange from FormData format if present
    if (req.body["investmentRange[min]"] || req.body["investmentRange[max]"]) {
      brand.investmentRange = {
        min: parseFloat(req.body["investmentRange[min]"]) || brand.investmentRange.min,
        max: parseFloat(req.body["investmentRange[max]"]) || brand.investmentRange.max,
      };
    }

    // Update other fields
    Object.keys(req.body).forEach((key) => {
      if (key !== "ownerId" && !key.includes("investmentRange")) {
        brand[key] = req.body[key];
      }
    });

    // Handle file updates
    if (req.files) {
      if (req.files.logo && req.files.logo[0]) {
        brand.logo = {
          data: req.files.logo[0].buffer,
          contentType: req.files.logo[0].mimetype,
        };
      }

      if (req.files.photos) {
        brand.photos = req.files.photos.slice(0, 5).map((file) => ({
          data: file.buffer,
          contentType: file.mimetype,
        }));
      }
    }

    await brand.save();

    const brandData = {
      ...brand.toObject(),
      logo: brand.logo && brand.logo.data ? `data:${brand.logo.contentType};base64,${brand.logo.data.toString("base64")}` : null,
      photos: brand.photos.map((photo) =>
        photo && photo.data ? `data:${photo.contentType};base64,${photo.data.toString("base64")}` : null
      ),
    };

    res.status(200).json({
      message: "Brand updated successfully",
      brand: brandData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE BRAND
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // Check if user is the owner
    if (brand.ownerId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to delete this brand" });
    }

    brand.isActive = false;
    await brand.save();

    res.status(200).json({
      message: "Brand deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH BRANDS
exports.searchBrands = async (req, res) => {
  try {
    const { keyword, category, minInvestment, maxInvestment } = req.query;

    const filter = { isActive: true };

    if (keyword) {
      filter.$or = [
        { brandName: { $regex: keyword, $options: "i" } },
        { aboutBrand: { $regex: keyword, $options: "i" } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (minInvestment || maxInvestment) {
      filter["investmentRange.min"] = { $gte: minInvestment || 0 };
      filter["investmentRange.max"] = { $lte: maxInvestment || Infinity };
    }

    const brands = await Brand.find(filter).populate("ownerId", "firstName lastName email");

    const brandsWithImages = brands.map((brand) => {
      const brandObj = brand.toObject();
      return {
        ...brandObj,
        investmentRange: brandObj.investmentRange || { min: 0, max: 0 },
        logo: brand.logo && brand.logo.data ? `data:${brand.logo.contentType};base64,${brand.logo.data.toString("base64")}` : null,
        photos: brand.photos.map((photo) =>
          photo && photo.data ? `data:${photo.contentType};base64,${photo.data.toString("base64")}` : null
        ),
      };
    });

    res.status(200).json({
      brands: brandsWithImages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BRAND COUNT
exports.getBrandCount = async (req, res) => {
  try {
    console.log("getBrandCount called");
    const count = await Brand.countDocuments({ isActive: true });
    console.log("Brand count:", count);
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error getting brand count:", error);
    res.status(500).json({ message: error.message });
  }
};
