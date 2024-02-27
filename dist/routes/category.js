"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_1 = require("../controllers/category");
const multer_1 = require("../middlewares/multer");
const categoryRouter = express_1.default.Router();
categoryRouter.route("/").post(multer_1.singleUpload, category_1.newCategory).get(category_1.getALLCategory);
categoryRouter.route("/:categoryId/products").get(category_1.getProductsSingleCategory);
exports.default = categoryRouter;
