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
exports.deleteShippingInfo = exports.updateShippingInfo = exports.createShippingInfo = void 0;
const shipping_1 = __importDefault(require("../models/shipping"));
const errorHandler_1 = require("../../middlewares/errorHandler");
const tryCatch_1 = require("../../middlewares/tryCatch");
exports.createShippingInfo = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const shipping = yield shipping_1.default.create(req.body);
    return res.status(201).json({
        success: true,
        message: "Shipping created successfully",
        shipping,
    });
}));
exports.updateShippingInfo = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { shippingId } = req.params;
    const shipping = yield shipping_1.default.findByIdAndUpdate(shippingId, { $set: req.body }, { new: true });
    if (!shipping)
        return next(new errorHandler_1.ErrorHandler("Shipping not found", 404));
    return res.status(200).json({
        success: true,
        message: "Shipping updated successfully",
        shipping,
    });
}));
exports.deleteShippingInfo = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { shippingId } = req.params;
    const shipping = yield shipping_1.default.findByIdAndDelete(shippingId, req.body);
    if (!shipping)
        return next(new errorHandler_1.ErrorHandler("Shipping not found", 404));
    return res.status(200).json({
        success: true,
        message: "Shipping deleted successfully",
    });
}));
