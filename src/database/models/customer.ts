import mongoose from "mongoose";
import customerSchema from "../schemas/customer";
import { CustomerDocument } from "../entities/customer";

const CustomerModel = mongoose.model<CustomerDocument>(
  "Customer",
  customerSchema
);

export default CustomerModel;
