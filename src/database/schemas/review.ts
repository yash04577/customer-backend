import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    rating: { type: Number},
    review: { type: String, },
    createdAt: { type: Date, default: Date.now }
  });

export default reviewSchema;
