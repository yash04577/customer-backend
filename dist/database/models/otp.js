"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const otp_1 = __importDefault(require("../schemas/otp"));
const OtpModel = mongoose_1.default.model("Otp", otp_1.default);
exports.default = OtpModel;
