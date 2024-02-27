import express from "express";
import {
    createNewCompany, getALLCompany,getProductsSingleCompany
} from "../controllers/company";

const companyRouter = express.Router();

companyRouter.route("/").post(createNewCompany).get(getALLCompany);
companyRouter.route("/:companyId/products").get(getProductsSingleCompany);
export default companyRouter;
