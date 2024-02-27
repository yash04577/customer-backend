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
exports.createFreightForCategory = void 0;
const tryCatch_1 = require("../middlewares/tryCatch");
const errorHandler_1 = require("../middlewares/errorHandler");
const freight_1 = __importDefault(require("../database/models/freight"));
const category_1 = __importDefault(require("../database/models/category"));
exports.createFreightForCategory = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { tempo, pickup, cantor, truck, category } = req.body;
    const categoryData = yield category_1.default.findOne({ name: category });
    if (!categoryData) {
        return next(new errorHandler_1.ErrorHandler("Category not found", 404));
    }
    const craeteFreight = yield freight_1.default.create({
        tempo,
        pickup,
        cantor,
        truck,
        categoryId: categoryData._id,
    });
    return res.status(200).json({
        success: true,
        message: `New Freight for ${category} is created`
    });
}));
