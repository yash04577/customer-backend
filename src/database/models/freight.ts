import mongoose from "mongoose";
import freightSchema from "../schemas/freight";
import { FreightDocument } from "../entities/freight";

const FreightModel = mongoose.model<FreightDocument>("Freight", freightSchema);

export default FreightModel;
