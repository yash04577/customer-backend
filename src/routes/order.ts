import express from "express";
import { createOrder, deleteOrder, myOrders } from "../controllers/order";
import { authMiddleware } from "../middlewares/auth";

const orderRouter = express.Router();

orderRouter.route("/create/:shippingInfoId").post(authMiddleware, createOrder);
orderRouter.route("/myOrder").get(authMiddleware, myOrders);
orderRouter.route("/:orderId").delete(authMiddleware, deleteOrder);

export default orderRouter;
