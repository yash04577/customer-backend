"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const wishList_1 = require("../controllers/wishList");
const wishListRouter = express_1.default.Router();
wishListRouter.route("/:productId").post(auth_1.authMiddleware, wishList_1.addToWishList);
wishListRouter.route("/").get(auth_1.authMiddleware, wishList_1.fetchWishListProductByCustomer);
wishListRouter.route("/:wishListtId").delete(auth_1.authMiddleware, wishList_1.deleteWishListProduct);
exports.default = wishListRouter;
