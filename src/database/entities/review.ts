import { Document, Types } from 'mongoose';

export interface ReviewDocument extends Document {
    customerId: Types.ObjectId;
    productId:Types.ObjectId
    rating: number;
    review: string;
    createdAt: Date;
  }