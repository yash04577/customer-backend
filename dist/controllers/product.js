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
const tryCatch_1 = require("../middlewares/tryCatch");
const errorHandler_1 = require("../middlewares/errorHandler");
const product_1 = __importDefault(require("../database/models/product"));
const category_1 = __importDefault(require("../database/models/category"));
const review_1 = __importDefault(require("../database/models/review"));
const fs_1 = require("fs");
const freight_1 = __importDefault(require("../database/models/freight"));
const company_1 = __importDefault(require("../database/models/company"));
//Create New Product
exports.createProduct = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, discountPrice, category, company, size, height, weight, thickness, mrpPrice, material, } = req.body;
    const image = req.file;
    if (!image)
        return next(new errorHandler_1.ErrorHandler("Please add Photo", 400));
    if (!name ||
        !description ||
        !discountPrice ||
        !mrpPrice ||
        !company ||
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
    const categoryData = yield category_1.default.findOne({ name: category });
    if (!categoryData) {
        return next(new errorHandler_1.ErrorHandler("Category not found", 404));
    }
    const companyData = yield company_1.default.findOne({ name: company });
    if (!companyData) {
        return next(new errorHandler_1.ErrorHandler("Company not found", 404));
    }
    const product = yield product_1.default.create({
        name,
        description,
        discountPrice,
        mrpPrice,
        image: image.path,
        company: companyData._id,
        size,
        height,
        weight,
        thickness,
        material,
        category: categoryData._id,
    });
    product.save();
    return res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
    });
}));
//get single product
exports.getSingleProduct = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const product = yield product_1.default.findById(productId)
        .populate({
        path: "company",
        select: "name description -_id", // Exclude _id
    })
        .populate({
        path: "category",
        select: "name description",
    });
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }
    const freightData = yield freight_1.default.findOne({
        categoryId: product.category,
    }).select({ categoryId: 0 });
    // console.log(frei)
    const result = { product, freightData };
    return res.status(200).json({
        success: true,
        message: "Getting product successfully",
        result: result,
    });
}));
//get all product
exports.getAllProduct = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_1.default.find()
        .populate({
        path: "category",
        select: "name -_id",
    })
        .populate({
        path: "company",
        select: "name -_id",
    });
    if (!product) {
        return next(new errorHandler_1.ErrorHandler("No Product Found", 400));
    }
    return res.status(200).json({
        success: true,
        message: "Getting product successfully",
        result: product,
    });
}));
//searching & filtering of product
exports.searchProduct = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, category, rating, company } = req.body;
    const { page, limit } = req.query;
    const parsePage = page ? parseInt(String(page)) : 1;
    const parseLimit = limit ? parseInt(String(limit)) : 6;
    const baseQuery = {};
    if (search) {
        const nameRegex = new RegExp(search, "i");
        const companyObjects = yield company_1.default.find({ name: nameRegex });
        const companyIds = companyObjects.map((company) => String(company._id));
        const categoryIds = companyObjects.map((category) => String(category._id));
        baseQuery.$or = [
            { name: { $regex: search, $options: "i" } },
            { company: { $in: companyIds } },
            { category: { $in: categoryIds } },
        ];
    }
    if (category && category.length > 0) {
        // const categoryObjects = await CategoryModel.find({
        //   _id: {
        //     $in: category.map((category: string) => new RegExp(category, "i")),
        //   },
        // });
        // const categoryId = categoryObjects.map((category) =>
        //   String(category._id)
        // );
        if (category.length > 0) {
            baseQuery.category = { $in: category };
        }
        else {
            return next(new errorHandler_1.ErrorHandler("Invalid Categories", 400));
        }
    }
    if (rating || rating === 0) {
        if (rating >= 1 && rating <= 5) {
            baseQuery.productRating = {
                $gte: rating,
            };
        }
        else {
            return next(new errorHandler_1.ErrorHandler("Rating can only be between 1-5", 400));
        }
    }
    if (company && company.length > 0) {
        // const companyObjects = await CompanyModel.find({
        //   name: {
        //     $in: company.map((company: string) => new RegExp(company, "i")),
        //   },
        // });
        // const companyId = companyObjects.map((company) => String(company._id));
        if (company.length > 0) {
            baseQuery.company = { $in: company };
        }
        else {
            return next(new errorHandler_1.ErrorHandler("Invalid Categories", 400));
        }
    }
    const count = yield product_1.default.countDocuments(baseQuery);
    const totalPages = Math.ceil(count / parseLimit);
    const currentPage = parsePage > totalPages ? totalPages : parsePage;
    const skip = (currentPage - 1) * parseLimit;
    const products = yield product_1.default.find(baseQuery)
        .populate({
        path: "company",
        select: "name -_id",
    })
        .populate({
        path: "category",
        select: "name -_id",
    })
        .skip(skip)
        .limit(parseLimit);
    return res.status(200).json({
        success: true,
        currentPage,
        totalPages,
        totalResult: count,
        products: products,
    });
}));
// create Review for particular product id
exports.createReview = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    const alreadyGivenReview = yield review_1.default.find({
        $and: [{ productId }, { customerId }],
    });
    if (alreadyGivenReview.length > 0) {
        return next(new errorHandler_1.ErrorHandler("you cannot Give multiple reviews for this product", 400));
    }
    const addReview = yield review_1.default.create({
        customerId,
        productId,
        review,
        rating,
    });
    // console.log(addReview)
    addReview.save;
    const reviewsForProduct = yield review_1.default.find({ productId });
    const totalRatings = reviewsForProduct.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRatings / reviewsForProduct.length;
    checkproductExist.productRating = averageRating;
    yield checkproductExist.save();
    return res.status(201).json({
        success: true,
        message: "Review created successfully",
    });
}));
//get all revies of product
exports.getALLReviewOfProduct = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    if (!productId)
        return next(new errorHandler_1.ErrorHandler("Invalid Prodyct ID", 400));
    const allReviewsOfProduct = yield review_1.default.find({ productId })
        .select("-_id review rating")
        .populate({
        path: "customerId",
        select: "name",
    });
    return res.status(200).json({
        succes: true,
        result: allReviewsOfProduct,
    });
}));
//modify review of product
exports.modifyReview = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = req.customerId;
    const { productId } = req.params;
    const { rating, review } = req.body;
    if (rating || rating === 0) {
        if (rating < 1 || rating > 5) {
            return next(new errorHandler_1.ErrorHandler("Rating should be between 1 to 5", 404));
        }
    }
    if (!customerId) {
        return next(new errorHandler_1.ErrorHandler("Login First", 400));
    }
    const checkproductExist = yield product_1.default.findById(productId);
    if (!checkproductExist) {
        return next(new errorHandler_1.ErrorHandler("Product not found", 404));
    }
    const alreadyGivenReview = yield review_1.default.findOne({
        $and: [{ productId }, { customerId }],
    });
    if (!alreadyGivenReview) {
        return next(new errorHandler_1.ErrorHandler("Cannot modify", 400));
    }
    const addReview = yield review_1.default.findOneAndUpdate({ customerId, productId }, { $set: { review, rating } });
    addReview === null || addReview === void 0 ? void 0 : addReview.save();
    const reviewsForProduct = yield review_1.default.find({ productId });
    const totalRatings = reviewsForProduct.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRatings / reviewsForProduct.length;
    checkproductExist.productRating = averageRating;
    yield checkproductExist.save();
    return res.status(200).json({
        success: true,
        message: "Review Updated successfully",
    });
}));
