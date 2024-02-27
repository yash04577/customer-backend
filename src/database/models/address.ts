import mongoose from "mongoose";
import addressSchema from "../schemas/address";
import { AddressDocument } from "../entities/address";

const AddressModel = mongoose.model<AddressDocument>("Address", addressSchema);

export default AddressModel;
