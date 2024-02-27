import { TryCatch } from "../middlewares/tryCatch";
import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../middlewares/errorHandler";
import FreightModel from "../database/models/freight";
import CategoryModel from "../database/models/category";

export const createFreightForCategory = TryCatch(async (req, res, next) => {
  const { tempo, pickup, cantor, truck, category } = req.body;

  const categoryData = await CategoryModel.findOne({ name: category });

  if (!categoryData) {
    return next(new ErrorHandler("Category not found", 404));
  }
  const craeteFreight = await FreightModel.create({
    tempo,
    pickup,
    cantor,
    truck,
    categoryId: categoryData._id,
  });


  return res.status(200).json({
    success:true,
 message:`New Freight for ${category} is created`
  });
});
