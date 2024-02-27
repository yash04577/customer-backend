"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidation = exports.mobileValidation = void 0;
const mobileValidation = (value) => {
    const mobileRegex = /^[1-9]{10}$/;
    return mobileRegex.test(value);
};
exports.mobileValidation = mobileValidation;
const emailValidation = (value) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(value);
};
exports.emailValidation = emailValidation;
