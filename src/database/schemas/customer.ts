import mongoose from "mongoose";
import { emailValidation, mobileValidation } from "../../validation/validation";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },

    mobileNumber: {
      type: String,
      required: [true, "Please enter mobile number"],
      validate: {
        validator: mobileValidation,
        message: "Please enter a valid mobile number",
      },
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

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Please enter gender"],
    },

    dob: {
      type: Date,
      required: [true, "Please enter date of birth"],
      get: (value: Date) => value.toISOString().split("T")[0],
    },

    image: {
      type: String,
      required: [true, "Please add image"],
    },

    password: {
      type: String,
      required: [true, "Please Enter Password"],
    },
  },
  {
    timestamps: true,
  }
);

export default customerSchema;
