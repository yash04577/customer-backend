"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const customer_1 = __importDefault(require("../schemas/customer"));
const CustomerModel = mongoose_1.default.model("Customer", customer_1.default);
exports.default = CustomerModel;
