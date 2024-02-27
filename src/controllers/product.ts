import { Request, Response, NextFunction } from "express";
import { TryCatch } from "../middlewares/tryCatch";
import { ProductDocument } from "../database/entities/product";
import { ErrorHandler } from "../middlewares/errorHandler";
import ProductModel from "../database/models/product";
import CategoryModel from "../database/models/category";
import ReviewModel from "../database/models/review";
import { rm } from "fs";
import { BaseQuery, SearchRequestBody } from "../types/types";
import { CustomRequest } from "../types/types";
import FreightModel from "../database/models/freight";
import path from "path";
import CompanyModel from "../database/models/company";

//Create New Product
export const createProduct = TryCatch(
  async (
    req: Request<{}, {}, ProductDocument>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      name,
      description,
      discountPrice,
      category,
      company,
      size,
      height,
      weight,
      thickness,
      mrpPrice,
      material,
    } = req.body;

    const image = req.file;

    if (!image) return next(new ErrorHandler("Please add Photo", 400));

    if (
      !name ||
      !description ||
      !discountPrice ||
      !mrpPrice ||
      !company ||
      !size ||
      !height ||
      !weight ||
      !thickness ||
      !material ||
      !category
    ) {
      rm(image.path, () => {
        console.log("Deleted");
      });

      return next(
        new ErrorHandler("Please provide all the required fields", 400)
      );
    }
    const categoryData = await CategoryModel.findOne({ name: category });
    if (!categoryData) {
      return next(new ErrorHandler("Category not found", 404));
    }
    const companyData = await CompanyModel.findOne({ name: company });
    if (!companyData) {
      return next(new ErrorHandler("Company not found", 404));
    }

    const product = await ProductModel.create({
      name,
      description,
      discountPrice,
      mrpPrice,
      image: image.path,
      company: companyData._id,
      size,
      height,
      weight,
      thickness,
      material,
      category: categoryData._id,
    });

    product.save();
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  }
);
//get single product
export const getSingleProduct = TryCatch(async (req, res, next) => {
  const { productId } = req.params;

  const product = await ProductModel.findById(productId)
    .populate({
      path: "company",
      select: "name description -_id", // Exclude _id
    })
    .populate({
      path: "category",
      select: "name description",
    });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const freightData = await FreightModel.findOne({
    categoryId: product.category,
  }).select({ categoryId: 0 });

  // console.log(frei)

  const result = { product, freightData };

  return res.status(200).json({
    success: true,
    message: "Getting product successfully",
    result: result,
  });
});
//get all product
export const getAllProduct = TryCatch(async (req, res, next) => {
  const product = await ProductModel.find()
    .populate({
      path: "category",
      select: "name -_id",
    })
    .populate({
      path: "company",
      select: "name -_id",
    });
  if (!product) {
    return next(new ErrorHandler("No Product Found", 400));
  }

  return res.status(200).json({
    success: true,
    message: "Getting product successfully",
    result: product,
  });
});

//searching & filtering of product
export const searchProduct = TryCatch(
  async (
    req: Request<{}, {}, SearchRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { search, category, rating, company } = req.body;
    const { page, limit } = req.query;

    const parsePage: number = page ? parseInt(String(page)) : 1;
    const parseLimit: number = limit ? parseInt(String(limit)) : 6;

    const baseQuery: BaseQuery = {};

    if (search) {
      const nameRegex = new RegExp(search, "i");

      const companyObjects = await CompanyModel.find({ name: nameRegex });
      const companyIds = companyObjects.map((company) => String(company._id));
      const categoryIds = companyObjects.map((category) =>
        String(category._id)
      );

      baseQuery.$or = [
        { name: { $regex: search, $options: "i" } },
        { company: { $in: companyIds } },
        { category: { $in: categoryIds } },
      ];
    }
    if (category && category.length > 0) {
      // const categoryObjects = await CategoryModel.find({
      //   _id: {
      //     $in: category.map((category: string) => new RegExp(category, "i")),
      //   },
      // });
      // const categoryId = categoryObjects.map((category) =>
      //   String(category._id)
      // );

      if (category.length > 0) {
        baseQuery.category = { $in: category };
      } else {
        return next(new ErrorHandler("Invalid Categories", 400));
      }
    }
    if (rating || rating === 0) {
      if (rating >= 1 && rating <= 5) {
        baseQuery.productRating = {
          $gte: rating,
        };
      } else {
        return next(new ErrorHandler("Rating can only be between 1-5", 400));
      }
    }
    if (company && company.length > 0) {
      // const companyObjects = await CompanyModel.find({
      //   name: {
      //     $in: company.map((company: string) => new RegExp(company, "i")),
      //   },
      // });
      // const companyId = companyObjects.map((company) => String(company._id));

      if (company.length > 0) {
        baseQuery.company = { $in: company };
      } else {
        return next(new ErrorHandler("Invalid Categories", 400));
      }
    }

    const count = await ProductModel.countDocuments(baseQuery);
    const totalPages = Math.ceil(count / parseLimit);
    const currentPage = parsePage > totalPages ? totalPages : parsePage;
    const skip = (currentPage - 1) * parseLimit;

    const products = await ProductModel.find(baseQuery)
      .populate({
        path: "company",
        select: "name -_id",
      })
      .populate({
        path: "category",
        select: "name -_id",
      })
      .skip(skip)
      .limit(parseLimit);

    return res.status(200).json({
      success: true,
      currentPage,
      totalPages,
      totalResult: count,
      products: products,
    });
  }
);

// create Review for particular product id
export const createReview = TryCatch(async (req: CustomRequest, res, next) => {
  const customerId = req.customerId;
  const { productId } = req.params;
  const { rating, review } = req.body;
  if (!customerId) {
    return next(new ErrorHandler("Login First", 400));
  }

  const checkproductExist = await ProductModel.findById(productId);
  if (!checkproductExist) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const alreadyGivenReview = await ReviewModel.find({
    $and: [{ productId }, { customerId }],
  });

  if (alreadyGivenReview.length > 0) {
    return next(
      new ErrorHandler("you cannot Give multiple reviews for this product", 400)
    );
  }
  const addReview = await ReviewModel.create({
    customerId,
    productId,
    review,
    rating,
  });

  // console.log(addReview)
  addReview.save;

  const reviewsForProduct = await ReviewModel.find({ productId });
  const totalRatings = reviewsForProduct.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  const averageRating = totalRatings / reviewsForProduct.length;
  checkproductExist.productRating = averageRating;
  await checkproductExist.save();

  return res.status(201).json({
    success: true,
    message: "Review created successfully",
  });
});

//get all revies of product
export const getALLReviewOfProduct = TryCatch(async (req, res, next) => {
  const { productId } = req.params;

  if (!productId) return next(new ErrorHandler("Invalid Prodyct ID", 400));
  const allReviewsOfProduct = await ReviewModel.find({ productId })
    .select("-_id review rating")
    .populate({
      path: "customerId",
      select: "name",
    });

  return res.status(200).json({
    succes: true,
    result: allReviewsOfProduct,
  });
});

//modify review of product
export const modifyReview = TryCatch(async (req: CustomRequest, res, next) => {
  const customerId = req.customerId;
  const { productId } = req.params;
  const { rating, review } = req.body;

  if (rating || rating === 0) {
    if (rating < 1 || rating > 5) {
      return next(new ErrorHandler("Rating should be between 1 to 5", 404));
    }
  }
  if (!customerId) {
    return next(new ErrorHandler("Login First", 400));
  }

  const checkproductExist = await ProductModel.findById(productId);
  if (!checkproductExist) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const alreadyGivenReview = await ReviewModel.findOne({
    $and: [{ productId }, { customerId }],
  });

  if (!alreadyGivenReview) {
    return next(new ErrorHandler("Cannot modify", 400));
  }
  const addReview = await ReviewModel.findOneAndUpdate(
    { customerId, productId },
    { $set: { review, rating } }
  );

  addReview?.save();
  const reviewsForProduct = await ReviewModel.find({ productId });
  const totalRatings = reviewsForProduct.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  const averageRating = totalRatings / reviewsForProduct.length;
  checkproductExist.productRating = averageRating;
  await checkproductExist.save();

  return res.status(200).json({
    success: true,
    message: "Review Updated successfully",
  });
});
