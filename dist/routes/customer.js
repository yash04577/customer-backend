"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_1 = require("../controllers/customer");
const customerRouter = express_1.default.Router();
customerRouter.route("/newCustomer").post(customer_1.newCustomer);
customerRouter.route("/login").post(customer_1.loginCustomer);
customerRouter.route("/allCustomers").get(customer_1.getAllCustomer);
customerRouter.route("/:customerId").get(customer_1.getSingle);
customerRouter.route("/:customerId").patch(customer_1.updateCustomer);
customerRouter.route("/:customerId").delete(customer_1.deleteCustomer);
exports.default = customerRouter;
