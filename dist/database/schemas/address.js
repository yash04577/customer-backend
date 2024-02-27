"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validation_1 = require("../../validation/validation");
const addressSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter firstName"],
    },
    lastName: {
        type: String,
        required: [true, "Please enter lastName"],
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: [true, "Email already in use"],
        validate: {
            validator: validation_1.emailValidation,
            message: "Please enter a valid email address",
        },
    },
    address: {
        type: String,
        required: [true, "Please enter address"],
    },
    pinCode: {
        type: Number,
        required: [true, "Please enter pinCode"],
    },
    mobileNumber: {
        type: String,
        required: [true, "Please enter mobile number"],
        validate: {
            validator: validation_1.mobileValidation,
            message: "Please enter a valid mobile number",
        },
    },
    state: {
        type: String,
        required: [true, "Please enter state"],
    },
    city: {
        type: String,
        required: [true, "Please enter city"],
    },
    gstNumber: {
        type: String,
    },
    customerId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
});
exports.default = addressSchema;
