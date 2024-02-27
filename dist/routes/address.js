"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const address_1 = require("../controllers/address");
const auth_1 = require("../middlewares/auth");
const addressRouter = express_1.default.Router();
addressRouter.route("/add").post(auth_1.authMiddleware, address_1.createAddress);
addressRouter.route("/all").get(auth_1.authMiddleware, address_1.getAllAddress);
addressRouter.route("/:addressId").patch(auth_1.authMiddleware, address_1.updateAddress);
addressRouter.route("/:addressId").delete(auth_1.authMiddleware, address_1.deleteAddress);
exports.default = addressRouter;
