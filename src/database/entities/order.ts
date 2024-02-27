import mongoose from "mongoose";

export type OrderItem = {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  image: string;
};

export interface OrderDocument extends Document {
  orderItems: OrderItem[];
  subTotal: number;
  totalAmount: number;
  tax: number;
  orderTotal: number;
  modeOfShipment: string;
  paymentMethod: string;
  customerId: mongoose.Types.ObjectId;
  status: string;
  shippingInfoId: mongoose.Types.ObjectId;
}
