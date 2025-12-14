import Review from "../models/reviewModel.js";
import Brand from "../models/brandModel.js";

export const addReview = async (req, res) => {
  const { brandId, rating, comment } = req.body;
  const review = await Review.create({ brandId, userId: req.user.id, rating, comment });
  // update brand rating (simple average)
  const agg = await Review.aggregate([
    { $match: { brandId: review.brandId } },
    { $group: { _id: "$brandId", avg: { $avg: "$rating" } } }
  ]);
  if (agg[0]) await Brand.findByIdAndUpdate(review.brandId, { rating: agg[0].avg });
  res.status(201).json(review);
};
