"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWishListProduct = exports.fetchWishListProductByCustomer = exports.addToWishList = void 0;
const customer_1 = __importDefault(require("../database/models/customer"));
const wishiList_1 = __importDefault(require("../database/models/wishiList"));
const errorHandler_1 = require("../middlewares/errorHandler");
const tryCatch_1 = require("../middlewares/tryCatch");
// add product to wishList
exports.addToWishList = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const customerId = req.customerId;
    const customer = yield customer_1.default.findById(customerId);
    if (!customer) {
        return res
            .status(404)
            .json({ success: false, message: "Customer not found" });
    }
    const existingWishListItem = yield wishiList_1.default.find({
        customerId,
        productId,
    });
    if (existingWishListItem.length > 0) {
        return res
            .status(200)
            .json({ success: true, message: "product Already added in Wishlist" });
    }
    const addToWishList = yield wishiList_1.default.create({
        customerId,
        productId,
    });
    return res
        .status(201)
        .json({ success: true, message: "Product added to Wishlist successfully" });
}));
// fetch all wishList product for customer
exports.fetchWishListProductByCustomer = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = req.customerId;
    const customer = yield customer_1.default.findById(customerId);
    if (!customer)
        return next(new errorHandler_1.ErrorHandler("No customer found", 404));
    const wishListProduct = yield wishiList_1.default.find({
        customerId,
    }).select("-customerId").populate({
        path: "productId",
        select: "name discountPrice -_id",
    });
    if (!wishListProduct || wishListProduct.length === 0) {
        return res.status(404).json({
            success: false,
            message: `No product present in wishlist for ${customer.name}`,
        });
    }
    res.status(200).json({
        success: true,
        message: `Fetching Whishlist Product of ${customer.name} successfully`,
        result: wishListProduct,
    });
}));
// remove product from wishList
exports.deleteWishListProduct = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { wishListtId } = req.params;
    const deletedProduct = yield wishiList_1.default.findByIdAndDelete(wishListtId);
    if (!deletedProduct) {
        return res.status(404).json({
            success: true,
            message: "No product Found",
        });
    }
    return res.status(200).json({
        success: true,
        message: `Product from Wishlist deleted successfully`,
    });
}));
