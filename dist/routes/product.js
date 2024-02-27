"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const multer_1 = require("../middlewares/multer");
const auth_1 = require("../middlewares/auth");
const productRouter = express_1.default.Router();
// product
productRouter.route("/").post(multer_1.singleUpload, product_1.createProduct);
productRouter.route("/all").get(product_1.getAllProduct);
productRouter.route("/search").post(product_1.searchProduct);
productRouter.route("/:productId").get(product_1.getSingleProduct);
// product reviews
productRouter
    .route("/:productId/reviews")
    .post(auth_1.authMiddleware, product_1.createReview)
    .get(product_1.getALLReviewOfProduct)
    .patch(auth_1.authMiddleware, product_1.modifyReview);
exports.default = productRouter;
