"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const address_1 = __importDefault(require("../schemas/address"));
const AddressModel = mongoose_1.default.model("Address", address_1.default);
exports.default = AddressModel;
