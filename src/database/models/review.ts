import mongoose from "mongoose";
import reviewSchema from "../schemas/review";
import { ReviewDocument } from "../entities/review";

const ReviewModel = mongoose.model<ReviewDocument>("Review", reviewSchema);
export default ReviewModel;