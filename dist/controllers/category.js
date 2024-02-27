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
const tryCatch_1 = require("../middlewares/tryCatch");
const errorHandler_1 = require("../middlewares/errorHandler");
const category_1 = __importDefault(require("../database/models/category"));
const product_1 = __importDefault(require("../database/models/product"));
const fs_1 = require("fs");
// create new category
exports.newCategory = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, code } = req.body;
    const image = req.file;
    if (!image)
        return next(new errorHandler_1.ErrorHandler("Please add Photo", 400));
    if (!name || !description || !code) {
        (0, fs_1.rm)(image.path, () => {
            console.log("Deleted");
        });
        return next(new errorHandler_1.ErrorHandler("Please provide all the required fields", 400));
    }
    const categoryName = yield category_1.default.find({
        $or: [{ name: { $regex: name, $options: "i" } }, { code: code }],
    });
    if (categoryName.length > 0) {
        const existingCode = categoryName.find((category) => category.code == code);
        if (existingCode) {
            return next(new errorHandler_1.ErrorHandler("Category with this code already exists", 404));
        }
        const existingName = categoryName.find((category) => category.name.toLowerCase() === name.toLowerCase());
        if (existingName) {
            return next(new errorHandler_1.ErrorHandler("Category with this name already exists", 404));
        }
    }
    const category = yield category_1.default.create({
        name,
        description,
        code,
        image: image.path,
    });
    category.save();
    return res.status(201).json({
        success: true,
        message: "Category created successfully",
    });
}));
// get all category
exports.getALLCategory = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_1.default.find();
    return res.status(200).json({
        success: true,
        result: category,
    });
}));
//get all the product of single cataegory
exports.getProductsSingleCategory = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const category = yield product_1.default.find({ category: categoryId })
        .populate({
        path: 'category',
        select: 'name -_id',
    })
        .populate({
        path: 'company',
        select: 'name -_id',
    });
    if (category.length === 0)
        return next(new errorHandler_1.ErrorHandler("Category Do not Exist", 400));
    return res.status(200).json({
        success: true,
        result: category,
    });
}));
