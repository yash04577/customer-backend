import { Request, Response, NextFunction } from "express";
import { TryCatch } from "../middlewares/tryCatch";
import { CustomerDocument } from "../database/entities/customer";
import { ErrorHandler } from "../middlewares/errorHandler";
import CustomerModel from "../database/models/customer";
import bcrypt from "bcrypt";
import { createToken } from "../middlewares/auth";

// Adding a new customer
export const newCustomer = TryCatch(
  async (
    req: Request<{}, {}, CustomerDocument>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, password, email, gender, dob, image, mobileNumber } =
      req.body;

    if (
      !name ||
      !password ||
      !email ||
      !gender ||
      !dob ||
      !image ||
      !mobileNumber
    ) {
      return next(new ErrorHandler("Please provide all fields ", 400));
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const customerAlreadyExists = await CustomerModel.findOne({ email });
    if (!customerAlreadyExists) {
      const customer = await CustomerModel.create({
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
    } else {
      res.status(400).json({
        success: false,
        message: "Customer already exists",
      });
    }
  }
);

// Login
export const loginCustomer = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  const customer = await CustomerModel.findOne({ email });

  // 401: unauthorized, 403: forbidden

  if (!customer) {
    return res.status(401).json({
      success: false,
      message: "Customer not registered",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(password, customer.password);
  if (!isPasswordCorrect) {
    return res.status(403).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const token = createToken(customer._id.toString(), "7d");

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
});

// Get All Customers
export const getAllCustomer = TryCatch(async (req, res, next) => {
  const customer = await CustomerModel.find();
  return res.status(200).json({
    success: true,
    message: "Getting all customer successfully",
    customer,
  });
});

// Get Single Customer
export const getSingle = TryCatch(async (req, res, next) => {
  const { customerId } = req.params;
  const customer = await CustomerModel.findById(customerId);

  if (!customer) return next(new ErrorHandler("Invalid ID", 400));

  return res.status(200).json({
    success: true,
    message: "Getting customer details successfully",
    customer,
  });
});

// Update customer
export const updateCustomer = TryCatch(async (req, res, next) => {
  const { customerId } = req.params;

  const customer = await CustomerModel.findByIdAndUpdate(customerId);
  if (!customer) return next(new ErrorHandler("Customer not found", 404));

  return res.status(200).json({
    success: true,
    message: "Customer updated successfully",
  });
});

// Delete customer
export const deleteCustomer = TryCatch(async (req, res, next) => {
  const { customerId } = req.params;
  const customer = await CustomerModel.findById(customerId);

  if (!customer) return next(new ErrorHandler("Invalid ID", 400));

  await customer.deleteOne();

  return res.status(204).json({
    success: true,
    message: "Customer deleted successfully",
  });
});
