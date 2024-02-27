import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mrpPrice: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },

  status:{
    type:String,
    enum:["active" , "inactive"],
    default:"active"
  },

  image: [{
    type: String,
    required: true,
  }],

  stock: {
    type: Number,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  size: { type: Number },
  height: { type: Number },
  weight: { type: Number },
  thickness: { type: Number },
  material: { type: String },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  productRating: { type: Number, default: 0 },
});

export default productSchema;
