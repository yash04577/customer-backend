import express from "express";
import {
  deleteCustomer,
  getAllCustomer,
  getSingle,
  loginCustomer,
  newCustomer,
  updateCustomer,
} from "../controllers/customer";

const customerRouter = express.Router();

customerRouter.route("/newCustomer").post(newCustomer);
customerRouter.route("/login").post(loginCustomer);

customerRouter.route("/allCustomers").get(getAllCustomer);
customerRouter.route("/:customerId").get(getSingle);
customerRouter.route("/:customerId").patch(updateCustomer);
customerRouter.route("/:customerId").delete(deleteCustomer);

export default customerRouter;
