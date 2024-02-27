import CartModel from "../database/models/cart";
import CustomerModel from "../database/models/customer";
import ProductModel from "../database/models/product";
import WishListModel from "../database/models/wishiList";
import { ErrorHandler } from "../middlewares/errorHandler";
import { TryCatch } from "../middlewares/tryCatch";
import { CustomRequest } from "../types/types";

// add product to wishList
export const addToWishList = TryCatch(async (req: CustomRequest, res, next) => {
  const { productId } = req.params;
  const customerId = req.customerId;
  const customer = await CustomerModel.findById(customerId);
  if (!customer) {
    return res
      .status(404)
      .json({ success: false, message: "Customer not found" });
  }
  const existingWishListItem = await WishListModel.find({
    customerId,
    productId,
  });
  if (existingWishListItem.length > 0) {
    return res
      .status(200)
      .json({ success: true, message: "product Already added in Wishlist" });
  }
  const addToWishList = await WishListModel.create({
    customerId,
    productId,
  });

  return res
    .status(201)
    .json({ success: true, message: "Product added to Wishlist successfully" });
});

// fetch all wishList product for customer
export const fetchWishListProductByCustomer = TryCatch(
  async (req: CustomRequest, res, next) => {
    const customerId = req.customerId;
    const customer = await CustomerModel.findById(customerId);

    if (!customer) return next(new ErrorHandler("No customer found", 404));

    const wishListProduct = await WishListModel.find({
      customerId,
    }).select("-customerId").populate({
      path: "productId",
      select: "name discountPrice -_id",
    });

    if (!wishListProduct || wishListProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No product present in wishlist for ${customer.name}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Fetching Whishlist Product of ${customer.name} successfully`,
      result:wishListProduct,
    });
  }
);

// remove product from wishList
export const deleteWishListProduct = TryCatch(async (req: CustomRequest, res, next) => {
  const { wishListtId } = req.params;

 const deletedProduct =  await WishListModel.findByIdAndDelete(wishListtId)
 if(!deletedProduct){
    return res.status(404).json({
        success: true,
        message: "No product Found",
      });
 }

  return res.status(200).json({
    success: true,
    message: `Product from Wishlist deleted successfully`,
  });
});
