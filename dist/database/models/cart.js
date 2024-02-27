"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cart_1 = __importDefault(require("../schemas/cart"));
const CartModel = mongoose_1.default.model("Cart", cart_1.default);
exports.default = CartModel;
