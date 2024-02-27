import AddressModel from "../database/models/address";
import CustomerModel from "../database/models/customer";
import { ErrorHandler } from "../middlewares/errorHandler";
import { TryCatch } from "../middlewares/tryCatch";
import { CustomRequest } from "../types/types";

export const createAddress = TryCatch(async (req: CustomRequest, res, next) => {
  const {
    firstName,
    lastName,
    email,
    mobileNumber,
    address,
    pinCode,
    state,
    city,
    gstNumber,
  } = req.body;

  const customerId = req.customerId;

  const customer = await CustomerModel.findById(customerId);
  if (!customer) {
    return res.status(404).json({
      success: false,
      message: "Customer not found",
    });
  }

  const addressAlreadyExists = await AddressModel.findOne({ email });
  if (addressAlreadyExists) {
    return next(
      new ErrorHandler(`Address already exists for ${customer.email}`, 400)
    );
  }

  if (
    !firstName ||
    !lastName ||
    !email ||
    !mobileNumber ||
    !address ||
    !pinCode ||
    !state ||
    !state ||
    !city ||
    !customerId
  )
    return next(new ErrorHandler("Please enter all fields", 400));

  const newAddress = await AddressModel.create({
    customerId,
    firstName,
    lastName,
    email,
    mobileNumber,
    address,
    pinCode,
    state,
    city,
    gstNumber,
  });

  return res.status(201).json({
    success: true,
    message: "Address created successfully",
    newAddress,
  });
});

export const getAllAddress = TryCatch(async (req: CustomRequest, res, next) => {
  const customerId = req.customerId;

  const customer = await CustomerModel.findById(customerId);

  if (!customer)
    return next(
      new ErrorHandler(`No Customer found with customerId ${customerId}`, 404)
    );

  const addresses = await AddressModel.find({ customerId });
  if (!addresses)
    return next(
      new ErrorHandler(`No addresses found for ${customer.name}`, 404)
    );

  return res.status(200).json({
    success: true,
    message: `Fetching all addresses of ${customer.name} successfully`,
    addresses,
  });
});

export const updateAddress = TryCatch(async (req: CustomRequest, res, next) => {
  const { addressId } = req.params;
  const customerId = req.customerId;
  const address = await AddressModel.findOneAndUpdate(
    { _id: addressId, customerId },
    req.body,
    { new: true }
  );

  if (!address) return next(new ErrorHandler("Address not found", 404));

  return res.status(200).json({
    success: true,
    message: "Address updated successfully",
  });
});

export const deleteAddress = TryCatch(async (req: CustomRequest, res, next) => {
  const { addressId } = req.params;
  const customerId = req.customerId;
  const address = await AddressModel.findByIdAndDelete(
    { _id: addressId, customerId },
    req.body
  );
  if (!address) return next(new ErrorHandler("Address not found", 404));
  return res.status(200).json({
    success: true,
    message: "Address deleted successfully",
  });
});
