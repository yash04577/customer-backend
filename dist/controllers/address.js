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
exports.deleteAddress = exports.updateAddress = exports.getAllAddress = exports.createAddress = void 0;
const address_1 = __importDefault(require("../database/models/address"));
const customer_1 = __importDefault(require("../database/models/customer"));
const errorHandler_1 = require("../middlewares/errorHandler");
const tryCatch_1 = require("../middlewares/tryCatch");
exports.createAddress = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, mobileNumber, address, pinCode, state, city, gstNumber, } = req.body;
    const customerId = req.customerId;
    const customer = yield customer_1.default.findById(customerId);
    if (!customer) {
        return res.status(404).json({
            success: false,
            message: "Customer not found",
        });
    }
    const addressAlreadyExists = yield address_1.default.findOne({ email });
    if (addressAlreadyExists) {
        return next(new errorHandler_1.ErrorHandler(`Address already exists for ${customer.email}`, 400));
    }
    if (!firstName ||
        !lastName ||
        !email ||
        !mobileNumber ||
        !address ||
        !pinCode ||
        !state ||
        !state ||
        !city ||
        !customerId)
        return next(new errorHandler_1.ErrorHandler("Please enter all fields", 400));
    const newAddress = yield address_1.default.create({
        customerId,
        firstName,
        lastName,
        email,
        mobileNumber,
        address,
        pinCode,
        state,
        city,
        gstNumber,
    });
    return res.status(201).json({
        success: true,
        message: "Address created successfully",
        newAddress,
    });
}));
exports.getAllAddress = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = req.customerId;
    const customer = yield customer_1.default.findById(customerId);
    if (!customer)
        return next(new errorHandler_1.ErrorHandler(`No Customer found with customerId ${customerId}`, 404));
    const addresses = yield address_1.default.find({ customerId });
    if (!addresses)
        return next(new errorHandler_1.ErrorHandler(`No addresses found for ${customer.name}`, 404));
    return res.status(200).json({
        success: true,
        message: `Fetching all addresses of ${customer.name} successfully`,
        addresses,
    });
}));
exports.updateAddress = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { addressId } = req.params;
    const customerId = req.customerId;
    const address = yield address_1.default.findOneAndUpdate({ _id: addressId, customerId }, req.body, { new: true });
    if (!address)
        return next(new errorHandler_1.ErrorHandler("Address not found", 404));
    return res.status(200).json({
        success: true,
        message: "Address updated successfully",
    });
}));
exports.deleteAddress = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { addressId } = req.params;
    const customerId = req.customerId;
    const address = yield address_1.default.findByIdAndDelete({ _id: addressId, customerId }, req.body);
    if (!address)
        return next(new errorHandler_1.ErrorHandler("Address not found", 404));
    return res.status(200).json({
        success: true,
        message: "Address deleted successfully",
    });
}));
