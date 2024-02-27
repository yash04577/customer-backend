"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const address_1 = require("../controllers/address");
const shippingRouter = express_1.default.Router();
shippingRouter.route("/create").post(address_1.createAddress);
shippingRouter.route("/:shippingId").patch(address_1.updateAddress);
shippingRouter.route("/:shippingId").delete(address_1.deleteAddress);
exports.default = shippingRouter;
