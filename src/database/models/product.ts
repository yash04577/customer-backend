import mongoose from "mongoose";
import productSchema from "../schemas/product";
import { ProductDocument } from "../entities/product";

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
