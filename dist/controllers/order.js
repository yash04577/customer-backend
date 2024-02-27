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
exports.deleteOrder = exports.myOrders = exports.createOrder = void 0;
const cart_1 = __importDefault(require("../database/models/cart"));
const customer_1 = __importDefault(require("../database/models/customer"));
const order_1 = __importDefault(require("../database/models/order"));
const errorHandler_1 = require("../middlewares/errorHandler");
const tryCatch_1 = require("../middlewares/tryCatch");
exports.createOrder = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = req.customerId;
    const { shippingInfoId } = req.params;
    const { modeOfShipment, paymentMethod } = req.body;
    const cartItems = yield cart_1.default.find({ customerId });
    const orderItems = [];
    let orderPrice = 0;
    let totalQuantity = 0;
    for (const cartItem of cartItems) {
        const itemTotalPrice = cartItem.quantity * cartItem.price;
        orderPrice += itemTotalPrice;
        totalQuantity += cartItem.quantity;
        orderItems.push({
            productId: cartItem.productId,
            quantity: cartItem.quantity,
            price: cartItem.price,
            image: cartItem.image,
        });
    }
    const tax = 0.18 * orderPrice;
    const totalPrice = tax + orderPrice;
    const order = yield order_1.default.create({
        customerId,
        shippingInfoId,
        orderItems,
        totalQuantity,
        orderPrice,
        tax,
        totalPrice,
        modeOfShipment,
        paymentMethod,
    });
    return res.status(201).json({
        success: true,
        message: "Order created successfully",
        order,
    });
}));
exports.myOrders = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = req.customerId;
    const customer = yield customer_1.default.findById(customerId);
    if (!customer)
        return next(new errorHandler_1.ErrorHandler("No customer found", 404));
    const orders = yield order_1.default.find({ customerId });
    if (!orders)
        return next(new errorHandler_1.ErrorHandler("Order not found", 404));
    return res.status(200).json({
        success: true,
        message: `Fetching orders of ${customer.name} successfully`,
        orders,
    });
}));
// export const getSingleOrder = TryCatch(async (req, res, next) => {
//   const { orderId } = req.params;
//   const order = await OrderModel.findById(orderId).populate("customer", "name");
//   if (!order) return next(new ErrorHandler("Order not found", 401));
//   return res.status(200).json({
//     success: false,
//     message: "Fetching orders successfully",
//     order,
//   });
// });
exports.deleteOrder = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    yield order_1.default.findByIdAndDelete(orderId);
    return res.status(200).json({
        success: true,
        message: "Order deleted successfully",
    });
}));
// const { orderItems, shippingInfo } = req.body;
//   console.log(req.body);
//   const customerId = req.customerId;
//   const customer = await CustomerModel.findById(customerId);
//   console.log("customer:", customer);
//   if (!customer) return next(new ErrorHandler("No customer found", 404));
//   const cartItems = await CartModel.find({ customerId });
//   console.log("cartItems:", cartItems);
//   const quantity = orderItems.reduce(
//     (acc: number, item: OrderItem) => acc + item.quantity,
//     0
//   );
//   console.log("quantity:", quantity);
//   const subTotal = orderItems.reduce(
//     (acc: number, item: OrderItem) => acc + item.mrpPrice * item.quantity,
//     0
//   );
//   const tax = 0.18 * subTotal;
//   const totalAmount = subTotal + tax;
//   const order = await OrderModel.create({
//     orderItems,
//     customer: customerId,
//     totalAmount,
//     quantity,
//     subTotal,
//     shippingInfo,
//   });
//   await order.save();
