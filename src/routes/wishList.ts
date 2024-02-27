import express from "express";

import { authMiddleware } from "../middlewares/auth";
import { addToWishList, deleteWishListProduct, fetchWishListProductByCustomer } from "../controllers/wishList";

const wishListRouter = express.Router();

wishListRouter.route("/:productId").post(authMiddleware, addToWishList);
wishListRouter.route("/").get(authMiddleware, fetchWishListProductByCustomer);
wishListRouter.route("/:wishListtId").delete(authMiddleware, deleteWishListProduct );

export default wishListRouter;
