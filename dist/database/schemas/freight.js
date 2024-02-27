"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const freightSchema = new mongoose_1.default.Schema({
    tempo: {
        capacity: {
            type: Number,
        },
        price: {
            type: Number,
        },
    },
    pickup: {
        capacity: {
            type: Number,
        },
        price: {
            type: Number,
        },
    },
    cantor: {
        capacity: {
            type: Number,
        },
        price: {
            type: Number,
        },
    },
    truck: {
        capacity: {
            type: Number,
        },
        price: {
            type: Number,
        },
    },
    categoryId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        require: true
    }
});
exports.default = freightSchema;
