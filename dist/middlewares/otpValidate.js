"use strict";
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
exports.otpVerification = void 0;
const otpVerification = (otpTime) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Milliseconds is:" + otpTime);
        const cDate = new Date();
        const difference_in_time = otpTime - cDate.getTime();
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
exports.otpVerification = otpVerification;
