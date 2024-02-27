"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const company_1 = __importDefault(require("../schemas/company"));
const CompanyModel = mongoose_1.default.model("Company", company_1.default);
exports.default = CompanyModel;
