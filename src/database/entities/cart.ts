import mongoose, { Document } from "mongoose";

export interface CartDocument extends Document {
  customerId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  image: string;
}
