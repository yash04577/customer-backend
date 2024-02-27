import express from "express";
import {
  createAddress,
  deleteAddress,
  getAllAddress,
  updateAddress,
} from "../controllers/address";

import { authMiddleware } from "../middlewares/auth";

const addressRouter = express.Router();

addressRouter.route("/add").post(authMiddleware, createAddress);
addressRouter.route("/all").get(authMiddleware, getAllAddress);
addressRouter.route("/:addressId").patch(authMiddleware, updateAddress);
addressRouter.route("/:addressId").delete(authMiddleware, deleteAddress);

export default addressRouter;
