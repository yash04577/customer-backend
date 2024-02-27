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
exports.deleteOrder = exports.getSingleOrder = exports.myOrders = exports.createOrder = void 0;
const customer_1 = __importDefault(require("../models/customer"));
const order_1 = __importDefault(require("../models/order"));
const product_1 = __importDefault(require("../models/product"));
const errorHandler_1 = require("../../middlewares/errorHandler");
const tryCatch_1 = require("../../middlewares/tryCatch");
exports.createOrder = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { shippingInfo, orderItems, customer, subTotal, tax, totalAmount, totalBundles, totalWeight, paymentMethod, } = req.body;
    yield order_1.default.create({
        shippingInfo,
        orderItems,
        customer,
        subTotal,
        tax,
        totalAmount,
        totalBundles,
        totalWeight,
        paymentMethod,
    });
    const reduceStock = (orderItems) => __awaiter(void 0, void 0, void 0, function* () {
        for (let i = 0; i < orderItems.length; i++) {
            const order = orderItems[i];
            const product = yield product_1.default.findById(order.productId);
            if (!product)
                return next(new errorHandler_1.ErrorHandler("Product not found", 401));
            product.stock = product.stock - order.quantity;
            yield product.save();
        }
        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
        });
    });
    return res.status(200).json({
        success: false,
        message: "Order created successfully",
    });
}));
exports.myOrders = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId } = req.query;
    const customer = yield customer_1.default.findById(customerId);
    if (!customer)
        return next(new errorHandler_1.ErrorHandler("No customer found", 404));
    const order = yield order_1.default.find().populate("customer", "name");
    if (!order)
        return next(new errorHandler_1.ErrorHandler("Order not found", 404));
    return res.status(200).json({
        success: true,
        message: `Fetching orders of ${customer.name} successfully`,
        order,
    });
}));
exports.getSingleOrder = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const order = yield order_1.default.findById(orderId).populate("customer", "name");
    if (!order)
        return next(new errorHandler_1.ErrorHandler("Order not found", 401));
    return res.status(200).json({
        success: false,
        message: "Fetching orders successfully",
        order,
    });
}));
exports.deleteOrder = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    yield order_1.default.findByIdAndDelete(orderId);
    return res.status(200).json({
        success: true,
        message: "Order deleted successfully",
    });
}));
