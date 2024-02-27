"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validation_1 = require("../../validation/validation");
const customerSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"],
    },
    mobileNumber: {
        type: String,
        required: [true, "Please enter mobile number"],
        validate: {
            validator: validation_1.mobileValidation,
            message: "Please enter a valid mobile number",
        },
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
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: [true, "Please enter gender"],
    },
    dob: {
        type: Date,
        required: [true, "Please enter date of birth"],
        get: (value) => value.toISOString().split("T")[0],
    },
    image: {
        type: String,
        required: [true, "Please add image"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Password"],
    },
}, {
    timestamps: true,
});
exports.default = customerSchema;
