import mongoose from "mongoose";
import companySchema from "../schemas/company";
import { CompanyDocument } from "../entities/company";

const CompanyModel = mongoose.model<CompanyDocument>("Company",companySchema);

export default CompanyModel;