"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const shipping_1 = __importDefault(require("../schemas/shipping"));
const ShippingModel = mongoose_1.default.model("Shipping", shipping_1.default);
exports.default = ShippingModel;
