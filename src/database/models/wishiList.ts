import mongoose from "mongoose";
import wishListSchema from "../schemas/wishlist";
import { CartDocument } from "../entities/cart";

const WishListModel = mongoose.model<CartDocument>("WishList", wishListSchema);

export default WishListModel;