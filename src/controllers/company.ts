import CompanyModel from "../database/models/company";
import ProductModel from "../database/models/product";
import { ErrorHandler } from "../middlewares/errorHandler";
import { TryCatch } from "../middlewares/tryCatch";

// create new company
export const createNewCompany = TryCatch(async (req, res, next) => {
  const { name ,description } = req.body;
  if(!name || !description){
    return next( new ErrorHandler("Please Provide All the inputs", 404))
  }

  const regexName = new RegExp(name, 'i');
  const findExistingCompany = await CompanyModel.find({name:regexName});
  if (findExistingCompany.length > 0) {
    
    const existingName = findExistingCompany.find(
      (category) => category.name.toLowerCase() === name.toLowerCase()
    );
    if (existingName) {
      return next(
        new ErrorHandler("Company with this name already exists", 404)
      );
    }
  }
  const createCompany = await CompanyModel.create({name,description})
  createCompany.save()
  return res.status(201).json({
    success: true,
    message: `${name} is  created successfully`
  });
});


//get all company

export const getALLCompany = TryCatch(async (req, res, next) => {
  const category = await CompanyModel.find();

  return res.status(200).json({
    success: true,
    result: category,
  });
});

//get all the product of single cataegory
export const getProductsSingleCompany = TryCatch(async (req, res, next) => {
  const { companyId } = req.params;

  const company = await ProductModel.find({ company: companyId })
  .populate({
    path: 'category', 
    select: 'name', 
  })
  .populate({
    path: 'company', 
    select: 'name description', 
  });

  if (company.length===0) return next(new ErrorHandler("Company Do not Exist", 400));

  return res.status(200).json({
    success: true,
    result: company,
  });
});