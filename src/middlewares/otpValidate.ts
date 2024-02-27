export const otpVerification = async (otpTime: number) => {
  try {
    console.log("Milliseconds is:" + otpTime);
    const cDate = new Date();

    const difference_in_time = otpTime - cDate.getTime();

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
