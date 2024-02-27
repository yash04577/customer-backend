import { Request, Response, NextFunction } from "express";
import { TryCatch } from "../middlewares/tryCatch";
import { ErrorHandler } from "../middlewares/errorHandler";
import { CategoryDocument } from "../database/entities/category";
import CategoryModel from "../database/models/category";
import ProductModel from "../database/models/product";
import { rm } from "fs";

// create new category
export const newCategory = TryCatch(
  async (
    req: Request<{}, {}, CategoryDocument>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, description, code } = req.body;
    const image = req.file;

    if (!image) return next(new ErrorHandler("Please add Photo", 400));
    if (!name || !description || !code) {
      rm(image.path, () => {
        console.log("Deleted");
      });

      return next(
        new ErrorHandler("Please provide all the required fields", 400)
      );
    }
    const categoryName = await CategoryModel.find({
      $or: [{ name: { $regex: name, $options: "i" } }, { code: code }],
    });

    if (categoryName.length > 0) {
      const existingCode = categoryName.find(
        (category) => category.code == code
      );
      if (existingCode) {
        return next(
          new ErrorHandler("Category with this code already exists", 404)
        );
      }
      const existingName = categoryName.find(
        (category) => category.name.toLowerCase() === name.toLowerCase()
      );
      if (existingName) {
        return next(
          new ErrorHandler("Category with this name already exists", 404)
        );
      }
    }
    const category = await CategoryModel.create({
      name,
      description,
      code,
      image: image.path,
    });

    category.save();

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
    });
  }
);

// get all category
export const getALLCategory = TryCatch(async (req, res, next) => {
  const category = await CategoryModel.find();

  return res.status(200).json({
    success: true,
    result: category,
  });
});

//get all the product of single cataegory
export const getProductsSingleCategory = TryCatch(async (req, res, next) => {
  const { categoryId } = req.params;

  const category = await ProductModel.find({ category: categoryId })
  .populate({
    path: 'category', 
    select: 'name -_id', 
  })
  .populate({
    path: 'company', 
    select: 'name -_id', 
  });

  if (category.length===0) return next(new ErrorHandler("Category Do not Exist", 400));

  return res.status(200).json({
    success: true,
    result: category,
  });
});
