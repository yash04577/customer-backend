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
exports.deleteCustomer = exports.updateCustomer = exports.getSingle = exports.getAllCustomer = exports.loginCustomer = exports.newCustomer = void 0;
const tryCatch_1 = require("../middlewares/tryCatch");
const errorHandler_1 = require("../middlewares/errorHandler");
const customer_1 = __importDefault(require("../database/models/customer"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../middlewares/auth");
// Adding a new customer
exports.newCustomer = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password, email, gender, dob, image, mobileNumber } = req.body;
    if (!name ||
        !password ||
        !email ||
        !gender ||
        !dob ||
        !image ||
        !mobileNumber) {
        return next(new errorHandler_1.ErrorHandler("Please provide all fields ", 400));
    }
    const hashPassword = bcrypt_1.default.hashSync(password, 10);
    const customerAlreadyExists = yield customer_1.default.findOne({ email });
    if (!customerAlreadyExists) {
        const customer = yield customer_1.default.create({
            name,
            email,
            mobileNumber,
            image,
            gender,
            dob,
            password: hashPassword,
        });
        return res.status(201).json({
            success: true,
            message: "Customer created successfully",
            customer,
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: "Customer already exists",
        });
    }
}));
// Login
exports.loginCustomer = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const customer = yield customer_1.default.findOne({ email });
    // 401: unauthorized, 403: forbidden
    if (!customer) {
        return res.status(401).json({
            success: false,
            message: "Customer not registered",
        });
    }
    const isPasswordCorrect = yield bcrypt_1.default.compare(password, customer.password);
    if (!isPasswordCorrect) {
        return res.status(403).json({
            success: false,
            message: "Invalid credentials",
        });
    }
    const token = (0, auth_1.createToken)(customer._id.toString(), "7d");
    if (!token) {
        return res.status(500).json({
            success: false,
            message: "Error generating token",
        });
    }
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    const cookieName = "jwtToken";
    res.cookie(cookieName, token, {
        path: "/",
        domain: "localhost",
        expires,
        httpOnly: true,
        signed: true,
    });
    return res.status(200).json({
        success: true,
        message: "Customer logged in successfully",
        token,
    });
}));
// Get All Customers
exports.getAllCustomer = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield customer_1.default.find();
    return res.status(200).json({
        success: true,
        message: "Getting all customer successfully",
        customer,
    });
}));
// Get Single Customer
exports.getSingle = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId } = req.params;
    const customer = yield customer_1.default.findById(customerId);
    if (!customer)
        return next(new errorHandler_1.ErrorHandler("Invalid ID", 400));
    return res.status(200).json({
        success: true,
        message: "Getting customer details successfully",
        customer,
    });
}));
// Update customer
exports.updateCustomer = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId } = req.params;
    const customer = yield customer_1.default.findByIdAndUpdate(customerId);
    if (!customer)
        return next(new errorHandler_1.ErrorHandler("Customer not found", 404));
    return res.status(200).json({
        success: true,
        message: "Customer updated successfully",
    });
}));
// Delete customer
exports.deleteCustomer = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId } = req.params;
    const customer = yield customer_1.default.findById(customerId);
    if (!customer)
        return next(new errorHandler_1.ErrorHandler("Invalid ID", 400));
    yield customer.deleteOne();
    return res.status(204).json({
        success: true,
        message: "Customer deleted successfully",
    });
}));
