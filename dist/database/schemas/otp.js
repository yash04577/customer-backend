"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const otpSchema = new mongoose_1.default.Schema({
    mobileNumber: {
        type: String,
        required: [true, "Please Enter Mobile Number"],
    },
    otp: {
        type: String,
        required: [true, "Please Enter OTP"],
    },
    otpExpiration: {
        type: Date,
        default: Date.now(),
        get: (otpExpiration) => otpExpiration.getTime(),
        set: (otpExpiration) => new Date(otpExpiration),
    },
});
exports.default = otpSchema;
