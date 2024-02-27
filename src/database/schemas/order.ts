import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
  totalQuantity: {
    type: Number,
    required: true,
  },
  orderPrice: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },

  shippingInfoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },

  modeOfShipment: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["upi", "cod", "card"],
    required: true,
  },

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },

  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered"],
    default: "pending",
  },
});

export default orderSchema;
