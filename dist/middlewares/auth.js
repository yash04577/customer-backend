"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.authMiddleware = void 0;
const tryCatch_1 = require("./tryCatch");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customer_1 = __importDefault(require("../database/models/customer"));
const errorHandler_1 = require("./errorHandler");
exports.authMiddleware = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.signedCookies.jwtToken;
    if (!token) {
        return res
            .status(401)
            .json({ message: "Authorization token is missing" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        const id = decoded.customerId;
        const customer = yield customer_1.default.findById(id);
        if (!customer) {
            return next(new errorHandler_1.ErrorHandler("Invalid Credentials", 400));
        }
        req.customerId = id;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}));
const createToken = (id, expiresIn) => {
    const token = jsonwebtoken_1.default.sign({ customerId: id }, process.env.SECRET_KEY, {
        expiresIn,
    });
    return token;
};
exports.createToken = createToken;
