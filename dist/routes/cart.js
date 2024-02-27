"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_1 = require("../controllers/cart");
const auth_1 = require("../middlewares/auth");
const cartRouter = express_1.default.Router();
cartRouter.route("/:productId").post(auth_1.authMiddleware, cart_1.addToCart);
cartRouter.route("/").get(auth_1.authMiddleware, cart_1.fetchCartByCustomer);
cartRouter.route("/:cartId").patch(auth_1.authMiddleware, cart_1.updateCart);
cartRouter.route("/:cartId").delete(auth_1.authMiddleware, cart_1.deleteCart);
exports.default = cartRouter;
