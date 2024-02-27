import CartModel from "../database/models/cart";
import CustomerModel from "../database/models/customer";
import ProductModel from "../database/models/product";
import { ErrorHandler } from "../middlewares/errorHandler";
import { TryCatch } from "../middlewares/tryCatch";
import { CustomRequest } from "../types/types";

// add product to cart
export const addToCart = TryCatch(async (req: CustomRequest, res, next) => {
  const { productId } = req.params;

  const customerId = req.customerId;

  const customer = await CustomerModel.findById(customerId);
  if (!customer) {
    return res
      .status(404)
      .json({ success: false, message: "Customer not found" });
  }

  const existingCartItem = await CartModel.findOne({
    customerId,
    productId,
  });

  if (existingCartItem) {
    existingCartItem.quantity += 1;
    await existingCartItem.save();
  } else {
    const product = await ProductModel.findById(productId);

    if (product) {
      const newCartItem = await CartModel.create({
        customerId,
        productId,
        price: product.mrpPrice,
        image: product.image.length > 0 ? product.image[0] : undefined,
      });
      await newCartItem.save();
    } else {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${productId} not found`,
      });
    }
  }

  return res
    .status(201)
    .json({ success: true, message: "Items added to cart successfully" });
});

// fetch all cart items for customer
export const fetchCartByCustomer = TryCatch(
  async (req: CustomRequest, res, next) => {
    const customerId = req.customerId;
    const customer = await CustomerModel.findById(customerId);

    if (!customer) return next(new ErrorHandler("No customer found", 404));

    const cartItems = await CartModel.find({
      customerId,
    }).populate({
      path: "product",
      select: "name price",
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: `No cart items present for ${customer.name}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Fetching cart items of ${customer.name} successfully`,
      cartItems,
    });
  }
);

export const updateCart = TryCatch(async (req: CustomRequest, res, next) => {
  const { cartId } = req.params;
  const customerId = req.customerId;
  const customer = await CustomerModel.findById(customerId);
  if (!customer) {
    return res
      .status(404)
      .json({ success: false, message: "Customer not found" });
  }

  const cartItems = await CartModel.findOneAndUpdate(
    { _id: cartId, customer: customerId },
    { $set: { cartItems: req.body.cartItems } },
    { new: true }
  );

  //  without $set, the cartItems field would be replaced entirely by req.body.cartItems. In the second example, using $set, only the specified fields within req.body.cartItems would be updated, leaving other fields in the document unaffected.

  if (!cartItems) return next(new ErrorHandler("No cart items present", 404));

  const updatedCartItems = await cartItems.populate("cartItems.product");

  return res.status(200).json({
    success: true,
    message: "Cart updated successfully",
    updatedCartItems,
  });
});

// remove product from cart
export const deleteCart = TryCatch(async (req: CustomRequest, res, next) => {
  const { cartId } = req.params;
  const customerId = req.customerId;

  await CartModel.findByIdAndDelete({ _id: cartId });

  return res.status(200).json({
    success: true,
    message: "Product from cart deleted successfully",
  });
});
