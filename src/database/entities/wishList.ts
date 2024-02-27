 import  { Document, Types } from "mongoose";

 export interface CartDocument extends Document {
   customerId: Types.ObjectId;
   productId: Types.ObjectId;
 }
 