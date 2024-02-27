import express from "express";
import {
  addToCart,
  deleteCart,
  fetchCartByCustomer,
  updateCart,
} from "../controllers/cart";
import { authMiddleware } from "../middlewares/auth";

const cartRouter = express.Router();

cartRouter.route("/:productId").post(authMiddleware, addToCart);
cartRouter.route("/").get(authMiddleware, fetchCartByCustomer);
cartRouter.route("/:cartId").patch(authMiddleware, updateCart);
cartRouter.route("/:cartId").delete(authMiddleware, deleteCart);

export default cartRouter;
