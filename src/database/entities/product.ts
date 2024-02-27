import { Document, Types } from "mongoose"



export interface ProductDocument extends Document {
  name: string;
  description: string;
  discountPrice: number;
  mrpPrice:number;
  status:"active"| "inActive";
  image: string[];
  productRating ?:number;
  company: Types.ObjectId;
  size: number;
  stock: number;
  height: number;
  weight: number;
  thickness: number;
  material: string;
  category: Types.ObjectId;
}
