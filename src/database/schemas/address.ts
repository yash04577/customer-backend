import mongoose from "mongoose";
import { emailValidation, mobileValidation } from "../../validation/validation";

const addressSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter firstName"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter lastName"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: [true, "Email already in use"],
    validate: {
      validator: emailValidation,
      message: "Please enter a valid email address",
    },
  },

  address: {
    type: String,
    required: [true, "Please enter address"],
  },
  pinCode: {
    type: Number,
    required: [true, "Please enter pinCode"],
  },
  mobileNumber: {
    type: String,
    required: [true, "Please enter mobile number"],
    validate: {
      validator: mobileValidation,
      message: "Please enter a valid mobile number",
    },
  },

  state: {
    type: String,
    required: [true, "Please enter state"],
  },
  city: {
    type: String,
    required: [true, "Please enter city"],
  },
  gstNumber: {
    type: String,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

export default addressSchema;
