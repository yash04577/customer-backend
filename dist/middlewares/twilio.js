"use strict";
// import { ResponseStatus } from "../types/types";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOtpIsExpired = void 0;
// import { Request, Response } from "express";
// export async function sendOTP(mobileNumber: string): Promise<ResponseStatus> {
//   try {
//     const verification = await client.verify.v2
//       .services(verifySid!)
//       .verifications.create({ to: mobileNumber, channel: "sms" });
//     console.log(verification.status);
//     return verification.status as ResponseStatus;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error sending OTP");
//   }
// }
// export const sendOTP = async (req: Request, res: Response) => {
// };
// export async function verifyOTP(
//   mobileNumber: string,
//   otpCode: string
// ): Promise<ResponseStatus> {
//   try {
//     const verification_check = await client.verify.v2
//       .services(verifySid!)
//       .verificationChecks.create({ to: mobileNumber, code: otpCode });
//     console.log(verification_check.status);
//     return verification_check.status as ResponseStatus;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error verifying OTP");
//   }
// }
const checkOtpIsExpired = (expiryDate) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noeDate = new Date();
        const difference_in_time = noeDate.getTime() - expiryDate;
        const difference_in_days = Math.round(difference_in_time / (1000 * 3600 * 24));
        console.log(`Expiry Days:- ` + difference_in_days);
        if (difference_in_days > 5) {
            return true;
        }
        return false;
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.checkOtpIsExpired = checkOtpIsExpired;
