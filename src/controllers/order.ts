import { OrderItem } from "../database/entities/order";
import CartModel from "../database/models/cart";
import CustomerModel from "../database/models/customer";
import OrderModel from "../database/models/order";
import { ErrorHandler } from "../middlewares/errorHandler";
import { TryCatch } from "../middlewares/tryCatch";
import { CustomRequest } from "../types/types";

export const createOrder = TryCatch(async (req: CustomRequest, res, next) => {
  const customerId = req.customerId;
  const { shippingInfoId } = req.params;
  const { modeOfShipment, paymentMethod } = req.body;

  const cartItems = await CartModel.find({ customerId });

  const orderItems = [];
  let orderPrice = 0;
  let totalQuantity = 0;
  for (const cartItem of cartItems) {
    const itemTotalPrice = cartItem.quantity * cartItem.price;
    orderPrice += itemTotalPrice;
    totalQuantity += cartItem.quantity;

    orderItems.push({
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      price: cartItem.price,
      image: cartItem.image,
    });
  }

  const tax = 0.18 * orderPrice;

  const totalPrice = tax + orderPrice;

  const order = await OrderModel.create({
    customerId,
    shippingInfoId,
    orderItems,
    totalQuantity,
    orderPrice,
    tax,
    totalPrice,
    modeOfShipment,
    paymentMethod,
  });

  return res.status(201).json({
    success: true,
    message: "Order created successfully",
    order,
  });
});

export const myOrders = TryCatch(async (req: CustomRequest, res, next) => {
  const customerId = req.customerId;
  const customer = await CustomerModel.findById(customerId);
  if (!customer) return next(new ErrorHandler("No customer found", 404));

  const orders = await OrderModel.find({ customerId });
  if (!orders) return next(new ErrorHandler("Order not found", 404));

  return res.status(200).json({
    success: true,
    message: `Fetching orders of ${customer.name} successfully`,
    orders,
  });
});

// export const getSingleOrder = TryCatch(async (req, res, next) => {
//   const { orderId } = req.params;
//   const order = await OrderModel.findById(orderId).populate("customer", "name");
//   if (!order) return next(new ErrorHandler("Order not found", 401));

//   return res.status(200).json({
//     success: false,
//     message: "Fetching orders successfully",
//     order,
//   });
// });

export const deleteOrder = TryCatch(async (req: CustomRequest, res, next) => {
  const { orderId } = req.params;

  await OrderModel.findByIdAndDelete(orderId);
  return res.status(200).json({
    success: true,
    message: "Order deleted successfully",
  });
});

// const { orderItems, shippingInfo } = req.body;
//   console.log(req.body);

//   const customerId = req.customerId;

//   const customer = await CustomerModel.findById(customerId);
//   console.log("customer:", customer);

//   if (!customer) return next(new ErrorHandler("No customer found", 404));

//   const cartItems = await CartModel.find({ customerId });
//   console.log("cartItems:", cartItems);

//   const quantity = orderItems.reduce(
//     (acc: number, item: OrderItem) => acc + item.quantity,
//     0
//   );

//   console.log("quantity:", quantity);
//   const subTotal = orderItems.reduce(
//     (acc: number, item: OrderItem) => acc + item.mrpPrice * item.quantity,
//     0
//   );

//   const tax = 0.18 * subTotal;

//   const totalAmount = subTotal + tax;

//   const order = await OrderModel.create({
//     orderItems,
//     customer: customerId,
//     totalAmount,
//     quantity,
//     subTotal,
//     shippingInfo,
//   });

//   await order.save();
