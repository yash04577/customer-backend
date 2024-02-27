"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = require("../controllers/order");
const auth_1 = require("../middlewares/auth");
const orderRouter = express_1.default.Router();
orderRouter.route("/create/:shippingInfoId").post(auth_1.authMiddleware, order_1.createOrder);
orderRouter.route("/myOrder").get(auth_1.authMiddleware, order_1.myOrders);
orderRouter.route("/:orderId").delete(auth_1.authMiddleware, order_1.deleteOrder);
exports.default = orderRouter;
