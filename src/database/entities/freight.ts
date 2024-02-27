import { Document,Types } from "mongoose";

interface Vehicle {
  capacity: number;
  price: number;
}

export interface FreightDocument extends Document {
  tempo: Vehicle;
  pickup: Vehicle;
  cantor: Vehicle;
  truck: Vehicle;
  categoryId: Types.ObjectId;
}
