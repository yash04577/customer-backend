import { Request, Response, NextFunction } from "express";
import { ObjectId, Types } from "mongoose";

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export type ResponseStatus = "approved" | "pending" | "failed" | "error";



export type SearchRequestBody = {
  search?: string;
  category?: string[];
  rating?: number;
  company?: string[];
};

// interface Search  {
//   name ?:{ $regex: string; $options: string };
//   company?: { $in: string[] }[];
// }

export interface BaseQuery {
  $or?: {
    name?: { $regex: string; $options: string };
    company?: { $in: string[] };
    category?: { $in: string[] };
  }[];
  category?: { $in: string[] }; 
  productRating ?: {$gte: number};
  company?: { $in: string[] }; 
  // company?: { $regex: RegExp };
}

export interface CustomRequest extends Request {
  customerId?: string;
}


