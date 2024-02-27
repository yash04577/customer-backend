import mongoose from "mongoose";

export interface CustomerDocument extends Document {
  name: string;
  email: string;
  image: string;
  mobileNumber: string;
  password: string;
  gender: string;
  dob: Date;
  addresses: mongoose.Schema.Types.ObjectId[];
}
