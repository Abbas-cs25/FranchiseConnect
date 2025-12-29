const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    logo: {
      data: Buffer,
      contentType: String,
    },
    photos: [
      {
        data: Buffer,
        contentType: String,
      },
    ],
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    investmentRange: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },
    areaRequired: {
      type: String,
      required: true,
    },
    franchiseOutlets: {
      type: Number,
      required: true,
    },
    locations: [String],
    establishedYear: {
      type: Number,
      required: true,
    },
    aboutBrand: {
      type: String,
      required: true,
    },
    operationCommencedOn: {
      type: Date,
      required: true,
    },
    franchiseCommencedOn: {
      type: Date,
      required: true,
    },
    brandFee: {
      type: Number,
      required: true,
    },
    anticipatedReturn: {
      type: Number,
      required: true,
    },
    paybackPeriod: {
      type: String,
      required: true,
    },
    otherInvestmentRequirements: {
      type: String,
    },
    expansionPlans: {
      type: String,
    },
    propertyTypeRequired: {
      type: String,
      required: true,
    },
    headOfficeLocation: {
      type: String,
      required: true,
    },
    transferPeriod: {
      type: String,
      required: true,
    },
    isTermRenewable: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Brand", brandSchema);
