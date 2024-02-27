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
exports.getProductsSingleCompany = exports.getALLCompany = exports.createNewCompany = void 0;
const company_1 = __importDefault(require("../database/models/company"));
const product_1 = __importDefault(require("../database/models/product"));
const errorHandler_1 = require("../middlewares/errorHandler");
const tryCatch_1 = require("../middlewares/tryCatch");
// create new company
exports.createNewCompany = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    if (!name || !description) {
        return next(new errorHandler_1.ErrorHandler("Please Provide All the inputs", 404));
    }
    const regexName = new RegExp(name, 'i');
    const findExistingCompany = yield company_1.default.find({ name: regexName });
    if (findExistingCompany.length > 0) {
        const existingName = findExistingCompany.find((category) => category.name.toLowerCase() === name.toLowerCase());
        if (existingName) {
            return next(new errorHandler_1.ErrorHandler("Company with this name already exists", 404));
        }
    }
    const createCompany = yield company_1.default.create({ name, description });
    createCompany.save();
    return res.status(201).json({
        success: true,
        message: `${name} is  created successfully`
    });
}));
//get all company
exports.getALLCompany = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield company_1.default.find();
    return res.status(200).json({
        success: true,
        result: category,
    });
}));
//get all the product of single cataegory
exports.getProductsSingleCompany = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyId } = req.params;
    const company = yield product_1.default.find({ company: companyId })
        .populate({
        path: 'category',
        select: 'name',
    })
        .populate({
        path: 'company',
        select: 'name description',
    });
    if (company.length === 0)
        return next(new errorHandler_1.ErrorHandler("Company Do not Exist", 400));
    return res.status(200).json({
        success: true,
        result: company,
    });
}));
