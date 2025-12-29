const Favorite = require("../models/favourite");
const Brand = require("../models/brandModel");

// ADD TO FAVORITES
exports.addFavorite = async (req, res) => {
  try {
    const { brandId } = req.body;

    // Check if brand exists
    const brand = await Brand.findById(brandId);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // Check if already favorited
    const existingFavorite = await Favorite.findOne({
      userId: req.user.userId,
      brandId,
    });

    if (existingFavorite) {
      return res.status(400).json({ message: "Brand already in favorites" });
    }

    const favorite = new Favorite({
      userId: req.user.userId,
      brandId,
    });

    await favorite.save();

    res.status(201).json({
      message: "Brand added to favorites",
      favorite,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET FAVORITES
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.userId }).populate({
      path: "brandId",
      model: Brand,
    });

    const brandsWithImages = favorites.map((fav) => {
      const brand = fav.brandId;
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
      favorites: brandsWithImages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REMOVE FROM FAVORITES
exports.removeFavorite = async (req, res) => {
  try {
    const { brandId } = req.params;

    const favorite = await Favorite.findOne({
      userId: req.user.userId,
      brandId,
    });

    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    await Favorite.deleteOne({ _id: favorite._id });

    res.status(200).json({
      message: "Brand removed from favorites",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CHECK IF FAVORITED
exports.isFavorited = async (req, res) => {
  try {
    const { brandId } = req.params;

    const favorite = await Favorite.findOne({
      userId: req.user.userId,
      brandId,
    });

    res.status(200).json({
      isFavorited: !!favorite,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
