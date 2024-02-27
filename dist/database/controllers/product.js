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
exports.modifyReview = exports.getALLReviewOfProduct = exports.createReview = exports.searchProduct = exports.getAllProduct = exports.getSingleProduct = exports.createProduct = void 0;
const tryCatch_1 = require("../../middlewares/tryCatch");
const errorHandler_1 = require("../../middlewares/errorHandler");
const product_1 = __importDefault(require("../models/product"));
const category_1 = __importDefault(require("../models/category"));
const review_1 = __importDefault(require("../models/review"));
const fs_1 = require("fs");
//Create New Product
exports.createProduct = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, category, manufacturer, size, height, weight, thickness, material, } = req.body;
    const image = req.file;
    if (!image)
        return next(new errorHandler_1.ErrorHandler("Please add Photo", 400));
    if (!name ||
        !description ||
        !price ||
        !manufacturer ||
        !size ||
        !height ||
        !weight ||
        !thickness ||
        !material ||
        !category) {
        (0, fs_1.rm)(image.path, () => {
            console.log("Deleted");
        });
        return next(new errorHandler_1.ErrorHandler("Please provide all the required fields", 400));
    }
    try {
        const categoryData = yield category_1.default.findOne({ name: category });
        if (!categoryData) {
            return next(new errorHandler_1.ErrorHandler("Category not found", 404));
        }
        const product = yield product_1.default.create({
            name,
            description,
            price,
            image: image.path,
            manufacturer,
            size,
            height,
            weight,
            thickness,
            material,
            category: categoryData._id,
        });
        return res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    }
    catch (error) {
        return next(new errorHandler_1.ErrorHandler("Error during product creation", 400));
    }
}));
//get single product
exports.getSingleProduct = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const product = yield product_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Getting product successfully",
            product,
        });
    }
    catch (error) {
        return next(new errorHandler_1.ErrorHandler("Error fetching product", 500));
    }
}));
//get all product
exports.getAllProduct = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.find();
        if (!product) {
            return next(new errorHandler_1.ErrorHandler("No Product Found", 400));
        }
        return res.status(200).json({
            success: true,
            message: "Getting product successfully",
            product,
        });
    }
    catch (error) {
        return next(new errorHandler_1.ErrorHandler("Error fetching product", 500));
    }
}));
//searching & filtering of product
exports.searchProduct = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, category, rating, manufacturer, price } = req.query;
        const baseQuery = {};
        if (search) {
            baseQuery.name = {
                $regex: search,
                $options: "i",
            };
        }
        if (manufacturer) {
            baseQuery.manufacturer = {
                $regex: manufacturer,
                $options: "i",
            };
        }
        if (price) {
            baseQuery.price = {
                $lte: Number(price),
            };
        }
        if (rating) {
            baseQuery.productRating = {
                $gte: Number(rating),
                $lt: Number(rating) + 1,
            };
        }
        if (category) {
            const categoryObject = yield category_1.default.find({
                name: { $regex: category, $options: "i" },
            });
            if (categoryObject && categoryObject.length > 0) {
                baseQuery.category = categoryObject[0]._id;
            }
            else {
                return next(new errorHandler_1.ErrorHandler("Invalid Category", 400));
            }
        }
        const products = yield product_1.default.find(baseQuery);
        return res.status(200).json({
            products: products,
        });
    }
    catch (error) {
        return next(new errorHandler_1.ErrorHandler("Error searching products", 500));
    }
}));
// create Review for particular product id
exports.createReview = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.customerId;
        const { productId } = req.params;
        const { rating, review } = req.body;
        if (!customerId) {
            return next(new errorHandler_1.ErrorHandler("Login First", 400));
        }
        const checkproductExist = yield product_1.default.findById(productId);
        if (!checkproductExist) {
            return next(new errorHandler_1.ErrorHandler("Product not found", 404));
        }
        const alreadyGivenReview = yield review_1.default.find({ $and: [{ productId }, { customerId }] });
        if (alreadyGivenReview.length > 0) {
            return next(new errorHandler_1.ErrorHandler("you cannot Give multiple reviews for this product", 400));
        }
        const addReview = yield review_1.default.create({
            customerId,
            productId,
            review,
            rating,
        });
        addReview.save;
        return res.status(200).json({
            success: true,
            message: "Review created successfully",
        });
    }
    catch (error) {
        return next(new errorHandler_1.ErrorHandler("Error creating review", 500));
    }
}));
//get all revies of product
exports.getALLReviewOfProduct = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    if (!productId)
        return next(new errorHandler_1.ErrorHandler("Invalid Prodyct ID", 400));
    const allReviewsOfProduct = yield review_1.default.find({ productId }).select('-_id review rating');
    return res.status(200).json({
        result: allReviewsOfProduct
    });
}));
//modify review of product
exports.modifyReview = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerId = req.customerId;
        const { productId } = req.params;
        const { rating, review } = req.body;
        if (!customerId) {
            return next(new errorHandler_1.ErrorHandler("Login First", 400));
        }
        const checkproductExist = yield product_1.default.findById(productId);
        if (!checkproductExist) {
            return next(new errorHandler_1.ErrorHandler("Product not found", 404));
        }
        const alreadyGivenReview = yield review_1.default.find({ $and: [{ productId }, { customerId }] });
        if (alreadyGivenReview.length !== 1) {
            return next(new errorHandler_1.ErrorHandler("Cannot modify", 400));
        }
        const addReview = yield review_1.default.findOneAndUpdate({
            customerId,
            productId,
            review,
            rating,
        });
        return res.status(200).json({
            success: true,
            message: "Review Updated successfully",
        });
    }
    catch (error) {
        return next(new errorHandler_1.ErrorHandler("Error creating review", 500));
    }
}));
