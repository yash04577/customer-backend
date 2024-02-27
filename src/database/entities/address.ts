import mongoose, { Document } from "mongoose";

export interface AddressDocument extends Document {
  firstName: String;
  lastName: String;
  email: String;
  address: String;
  pinCode: Number;
  mobileNumber: String;
  state: String;
  city: String;
  gstNumber: String;
  customerId?: mongoose.Types.ObjectId;
}
