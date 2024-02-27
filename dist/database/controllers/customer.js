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
exports.deleteCustomer = exports.getSingle = exports.getAllCustomer = exports.loginCustomer = exports.newCustomer = void 0;
const tryCatch_1 = require("../../middlewares/tryCatch");
const errorHandler_1 = require("../../middlewares/errorHandler");
const customer_1 = __importDefault(require("../models/customer"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Adding a new customer
exports.newCustomer = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password, email, gender, dob, state, city, pinCode, image, mobileNumber, } = req.body;
    if (!name ||
        !password ||
        !email ||
        !gender ||
        !dob ||
        !state ||
        !city ||
        !pinCode ||
        !image ||
        !mobileNumber) {
        return next(new errorHandler_1.ErrorHandler("Please provide all fields ", 400));
    }
    const hashPassword = bcrypt_1.default.hashSync(password, 10);
    const customerAlreadyExists = yield customer_1.default.findOne({ email });
    if (!customerAlreadyExists) {
        const user = yield customer_1.default.create({
            name,
            email,
            mobileNumber,
            image,
            gender,
            dob: new Date(dob),
            state,
            city,
            pinCode,
            password: hashPassword,
        });
        return res.status(200).json({
            success: true,
            message: "Customer created successfully",
            user,
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
    const { name, pass } = req.body;
    console.log("Body", name);
    const customer = yield customer_1.default.findOne({ name });
    let passwordStatus;
    console.log("Body", pass);
    if (customer) {
        passwordStatus = bcrypt_1.default.compareSync(pass, customer.password);
    }
    else {
        return next(new errorHandler_1.ErrorHandler(`There is no customer of name ${name}`, 400));
    }
    console.log("Body", customer);
    try {
        if (!passwordStatus) {
            return next(new errorHandler_1.ErrorHandler(`Incorrect Paasword`, 400));
        }
        const token = jsonwebtoken_1.default.sign({ customerId: customer._id }, "Lohawalla");
        return res.status(200).json({
            token,
        });
    }
    catch (error) {
        res.status(200).json({
            message: "login First",
        });
    }
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
// Delete customer
exports.deleteCustomer = (0, tryCatch_1.TryCatch)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { customerId } = req.params;
    const customer = yield customer_1.default.findById(customerId);
    if (!customer)
        return next(new errorHandler_1.ErrorHandler("Invalid ID", 400));
    yield customer.deleteOne();
    return res.status(200).json({
        success: true,
        message: "Customer deleted successfully",
    });
}));
