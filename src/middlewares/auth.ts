import { TryCatch } from "./tryCatch";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../types/types";
import CustomerModel from "../database/models/customer";
import { ErrorHandler } from "./errorHandler";
import mongoose from "mongoose";

interface JwtPayload {
  customerId: mongoose.Types.ObjectId | string;
  iat: number;
  exp: number;
}

export const authMiddleware = TryCatch(
  async (req: CustomRequest, res, next) => {
    const token = req.signedCookies.jwtToken;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing" });
    }

    try {
      const decoded: any = jwt.verify(token, process.env.SECRET_KEY!);
      const id = decoded.customerId;
      const customer = await CustomerModel.findById(id);
      if (!customer) {
        return next(new ErrorHandler("Invalid Credentials", 400));
      }
      req.customerId = id;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }
);

export const createToken = (id: string, expiresIn: string) => {
  const token = jwt.sign({ customerId: id }, process.env.SECRET_KEY!, {
    expiresIn,
  });
  return token;
};
