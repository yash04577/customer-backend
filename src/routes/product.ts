import express from "express";
import {
  getSingleProduct,
  createProduct,
  createReview,
  getALLReviewOfProduct,
  searchProduct,
  getAllProduct,
  modifyReview,
} from "../controllers/product";
import { singleUpload } from "../middlewares/multer";
import { authMiddleware } from "../middlewares/auth";

const productRouter = express.Router();

// product
productRouter.route("/").post(singleUpload, createProduct);
productRouter.route("/all").get(getAllProduct);
productRouter.route("/search").post(searchProduct);
productRouter.route("/:productId").get(getSingleProduct);
// product reviews
productRouter
  .route("/:productId/reviews")
  .post(authMiddleware, createReview)
  .get(getALLReviewOfProduct)
  .patch(authMiddleware, modifyReview);

export default productRouter;
