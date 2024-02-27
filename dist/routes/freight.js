"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const freight_1 = require("../controllers/freight");
const freightRouter = express_1.default.Router();
freightRouter.route("/").post(freight_1.createFreightForCategory);
exports.default = freightRouter;
