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
exports.deleteCart = exports.updateCart = exports.fetchCartByCustomer = exports.addToCart = void 0;
const cart_1 = __importDefault(require("../models/cart"));
const customer_1 = __importDefault(require("../models/customer"));
const errorHandler_1 = require("../../middlewares/errorHandler");
const tryCatch_1 = require("../../middlewares/tryCatch");
exports.addToCart = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer, product, quantity } = req.body;
    const cartItems = yield cart_1.default.create({ customer, product, quantity });
    const result = yield cartItems.populate({
        path: "product",
        select: "name price image ",
    });
    return res.status(200).json({
        success: true,
        message: "Adding products to cart successfully",
        result,
    });
}));
exports.fetchCartByCustomer = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId } = req.query;
    const customer = yield customer_1.default.findById(customerId);
    if (!customer)
        return next(new errorHandler_1.ErrorHandler("No customer found", 404));
    const cartItems = yield cart_1.default.find({ customer: customer._id }).populate("product");
    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({
            success: false,
            message: "No cart items present for this customer",
        });
    }
    res.status(201).json({
        success: true,
        message: `Fetching cart items of ${customer.name} successfully`,
        cartItems,
    });
}));
exports.updateCart = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartId } = req.params;
    const cartItems = yield cart_1.default.findByIdAndUpdate(cartId, req.body, {
        new: true,
    });
    if (!cartItems)
        return next(new errorHandler_1.ErrorHandler("No cart items present", 404));
    const result = yield cartItems.populate("product");
    return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        result,
    });
}));
exports.deleteCart = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartId } = req.params;
    const cartItems = yield cart_1.default.findByIdAndDelete(cartId);
    return res.status(200).json({
        success: true,
        message: "Cart deleted successfully",
    });
}));
