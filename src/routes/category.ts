import express from "express";
import { getALLCategory, newCategory,getProductsSingleCategory } from "../controllers/category";
import { singleUpload } from "../middlewares/multer";

const categoryRouter = express.Router();

categoryRouter.route("/").post(singleUpload, newCategory).get(getALLCategory)
categoryRouter.route("/:categoryId/products").get(getProductsSingleCategory)
export default categoryRouter;
