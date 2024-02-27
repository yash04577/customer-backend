"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_1 = require("../controllers/company");
const companyRouter = express_1.default.Router();
companyRouter.route("/").post(company_1.createNewCompany).get(company_1.getALLCompany);
companyRouter.route("/:companyId/products").get(company_1.getProductsSingleCompany);
exports.default = companyRouter;
