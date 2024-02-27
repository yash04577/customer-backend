"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    customerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Customer' },
    productId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Product' },
    rating: { type: Number },
    review: { type: String, },
    createdAt: { type: Date, default: Date.now }
});
exports.default = reviewSchema;
