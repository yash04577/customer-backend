import express from "express";
import { createFreightForCategory } from "../controllers/freight";

const freightRouter = express.Router();

freightRouter.route("/").post(createFreightForCategory)
export default freightRouter;
