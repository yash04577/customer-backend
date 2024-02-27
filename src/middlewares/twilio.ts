// import { ResponseStatus } from "../types/types";

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

export const checkOtpIsExpired = async (expiryDate: number) => {
  try {
    const noeDate = new Date();

    const difference_in_time = noeDate.getTime() - expiryDate;

    const difference_in_days = Math.round(
      difference_in_time / (1000 * 3600 * 24)
    );

    console.log(`Expiry Days:- ` + difference_in_days);

    if (difference_in_days > 5) {
      return true;
    }
    return false;
  } catch (error: any) {
    console.log(error.message);
  }
};
