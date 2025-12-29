const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure a user can only favorite a brand once
favoriteSchema.index({ userId: 1, brandId: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", favoriteSchema);
