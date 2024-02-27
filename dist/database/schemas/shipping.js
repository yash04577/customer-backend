"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const shippingSchema = new mongoose_1.default.Schema({
    modeOfShippment: {
        type: String,
        enum: ["Delivery", "Pickup"],
        required: [true, "Please enter mode of shippment"],
    },
    billingAddress: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        pinCode: {
            type: Number,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        gstNumber: {
            type: String,
        },
    },
    shippingMethod: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["upi", "creditCard", "paypal", "bankTransfer", "cashOnDelivery"],
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = shippingSchema;
