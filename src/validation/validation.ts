export const mobileValidation = (value: string) => {
  const mobileRegex = /^[1-9]{10}$/;
  return mobileRegex.test(value);
};

export const emailValidation = (value: string) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(value);
};
