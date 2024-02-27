import mongoose from "mongoose";
import orderSchema from "../schemas/order";
import { OrderDocument } from "../entities/order";

const OrderModel = mongoose.model<OrderDocument>("Order", orderSchema);

export default OrderModel;
