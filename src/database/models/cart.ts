import mongoose from "mongoose";
import cartSchema from "../schemas/cart";
import { CartDocument } from "../entities/cart";

const CartModel = mongoose.model<CartDocument>("Cart", cartSchema);

export default CartModel;
