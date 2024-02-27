import mongoose from "mongoose";
import categorySchema from "../schemas/category";
import { CategoryDocument } from "../entities/category";

const CategoryModel = mongoose.model<CategoryDocument>("Category", categorySchema);

export default CategoryModel;