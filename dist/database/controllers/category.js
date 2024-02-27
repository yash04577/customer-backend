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
exports.getProductsSingleCategory = exports.getALLCategory = exports.newCategory = void 0;
const tryCatch_1 = require("../../middlewares/tryCatch");
const errorHandler_1 = require("../../middlewares/errorHandler");
const category_1 = __importDefault(require("../models/category"));
const product_1 = __importDefault(require("../models/product"));
// create new category 
exports.newCategory = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, code, image } = req.body;
    const categoryName = yield category_1.default.find({
        $or: [
            { name: { $regex: name, $options: "i" } },
            { code: code }
        ]
    });
    if (categoryName.length > 0) {
        const existingName = categoryName.find(category => category.name.toLowerCase() === name.toLowerCase());
        if (existingName) {
            throw new Error("Category with this name already exists");
        }
        const existingCode = categoryName.find(category => category.code === code);
        if (existingCode) {
            throw new Error("Category with this code already exists");
        }
    }
    if (!name || !description || !code || !image) {
        return next(new errorHandler_1.ErrorHandler("Please provide all the required field", 400));
    }
    try {
        const category = yield category_1.default.create({ name, description, code, image });
        category.save();
    }
    catch (error) {
        return next(new errorHandler_1.ErrorHandler("Error during user creation", 400));
    }
    return res.status(200).json({
        success: true,
        message: "Category created successfully",
    });
}));
// get all category 
exports.getALLCategory = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_1.default.find();
    return res.status(200).json({
        result: category,
    });
}));
exports.getProductsSingleCategory = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const category = yield product_1.default.find({ category: categoryId });
    if (!category)
        return next(new errorHandler_1.ErrorHandler("Incorrect category id", 400));
    return res.status(200).json({
        result: category,
    });
}));
