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
const cart_1 = __importDefault(require("../database/models/cart"));
const customer_1 = __importDefault(require("../database/models/customer"));
const product_1 = __importDefault(require("../database/models/product"));
const errorHandler_1 = require("../middlewares/errorHandler");
const tryCatch_1 = require("../middlewares/tryCatch");
// add product to cart
exports.addToCart = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const customerId = req.customerId;
    const customer = yield customer_1.default.findById(customerId);
    if (!customer) {
        return res
            .status(404)
            .json({ success: false, message: "Customer not found" });
    }
    const existingCartItem = yield cart_1.default.findOne({
        customerId,
        productId,
    });
    if (existingCartItem) {
        existingCartItem.quantity += 1;
        yield existingCartItem.save();
    }
    else {
        const product = yield product_1.default.findById(productId);
        if (product) {
            const newCartItem = yield cart_1.default.create({
                customerId,
                productId,
                price: product.mrpPrice,
                image: product.image.length > 0 ? product.image[0] : undefined,
            });
            yield newCartItem.save();
        }
        else {
            return res.status(404).json({
                success: false,
                message: `Product with ID ${productId} not found`,
            });
        }
    }
    return res
        .status(201)
        .json({ success: true, message: "Items added to cart successfully" });
}));
// fetch all cart items for customer
exports.fetchCartByCustomer = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = req.customerId;
    const customer = yield customer_1.default.findById(customerId);
    if (!customer)
        return next(new errorHandler_1.ErrorHandler("No customer found", 404));
    const cartItems = yield cart_1.default.find({
        customerId,
    }).populate({
        path: "product",
        select: "name price",
    });
    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({
            success: false,
            message: `No cart items present for ${customer.name}`,
        });
    }
    res.status(200).json({
        success: true,
        message: `Fetching cart items of ${customer.name} successfully`,
        cartItems,
    });
}));
exports.updateCart = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartId } = req.params;
    const customerId = req.customerId;
    const customer = yield customer_1.default.findById(customerId);
    if (!customer) {
        return res
            .status(404)
            .json({ success: false, message: "Customer not found" });
    }
    const cartItems = yield cart_1.default.findOneAndUpdate({ _id: cartId, customer: customerId }, { $set: { cartItems: req.body.cartItems } }, { new: true });
    //  without $set, the cartItems field would be replaced entirely by req.body.cartItems. In the second example, using $set, only the specified fields within req.body.cartItems would be updated, leaving other fields in the document unaffected.
    if (!cartItems)
        return next(new errorHandler_1.ErrorHandler("No cart items present", 404));
    const updatedCartItems = yield cartItems.populate("cartItems.product");
    return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        updatedCartItems,
    });
}));
// remove product from cart
exports.deleteCart = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartId } = req.params;
    const customerId = req.customerId;
    yield cart_1.default.findByIdAndDelete({ _id: cartId });
    return res.status(200).json({
        success: true,
        message: "Product from cart deleted successfully",
    });
}));
