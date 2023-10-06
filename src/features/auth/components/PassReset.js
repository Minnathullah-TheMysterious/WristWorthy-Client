import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { requestPasswordReset, resetPassword, verifyOtp } from "../authAPI";
import { useDispatch } from "react-redux";
import { requestPasswordResetMailAsync } from "../authSlice";

const PassReset = () => {
  const dispatch = useDispatch();
  
  const [phoneInputDisabled, setPhoneInputDisabled] = useState(false);
  const [emailInputDisabled, setEmailInputDisabled] = useState(false);
  const [passwordResetReqSuccess, setPasswordResetReqSuccess] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const ReqResetData = { phone, email };
  //TODO: Still using localStorage, need to find alternate, I think it is available in passport.js
  const userId = localStorage.getItem("user_id");
  const passwords = { newPassword, confirmNewPassword };

  const handlePhoneInputChange = (value) => {
    setPhone(value);
    if (!value) {
      setEmailInputDisabled(false);
    } else {
      setEmailInputDisabled(true);
    }
  };

  const handleEmailInputChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value.length) {
      setPhoneInputDisabled(true);
    } else {
      setPhoneInputDisabled(false);
    }
  };

  const handlePasswordResetReqOtpClick = async (e) => {
    e.preventDefault();
    try {
      const response = await requestPasswordReset(ReqResetData);
      if (response) {
        setPasswordResetReqSuccess(response);
      }
    } catch (error) {
      console.error(
        "something went wrong in requesting for reset password",
        error
      );
    }
  };

  const handlePasswordResetReqMailClick = async (e) => {
    e.preventDefault();
    const resetPasswordLink = `${window.location.origin}/Reset-password/${email}`;
    console.log(resetPasswordLink)
    dispatch(requestPasswordResetMailAsync({ email, resetPasswordLink }));
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyOtp(userId, otp);
      if (response) {
        setOtpVerified(response);
      }
    } catch (error) {
      console.error("Something Went Wrong While Verifying OTP", error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword(userId, passwords);
      if (response) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Something Went Wrong While Resetting Password", error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/images/logo256.png"
            alt="Your Company"
          />
          <h2 className="font-serif mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset Password
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          {!passwordResetReqSuccess && !otpVerified ? (
            <>
              <form>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone
                  </label>
                  <div className="mt-2">
                    <PhoneInput
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="phone"
                      disabled={phoneInputDisabled}
                      value={phone}
                      onChange={handlePhoneInputChange}
                      defaultCountry="IN"
                      className="disabled:bg-gray-200 w-full rounded-md border-0 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="text-center mt-6 text-bold font-serif">OR</div>
                <div className="mt-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      disabled={emailInputDisabled}
                      value={email}
                      onChange={handleEmailInputChange}
                      className="disabled:bg-gray-200 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {!phoneInputDisabled ? (
                  <div>
                    <button
                      type="button"
                      onClick={handlePasswordResetReqOtpClick}
                      className="mt-6 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      GET OTP
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      type="button"
                      onClick={handlePasswordResetReqMailClick}
                      className="mt-6 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      GET LINK
                    </button>
                  </div>
                )}
              </form>

              <p className="mt-5 text-end text-sm">
                <Link
                  to={"/login"}
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Back To Login
                </Link>
              </p>
            </>
          ) : passwordResetReqSuccess && !otpVerified ? (
            <>
              <form
                noValidate
                className="space-y-5"
                action="#"
                method="POST"
                onSubmit={handleVerifyOtp}
              >
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    OTP
                  </label>
                  <div className="mt-2">
                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Verify OTP
                  </button>
                </div>
              </form>

              <p className="mt-5 text-end text-sm text-gray-500">
                <button
                  type="button"
                  onClick={() => setPasswordResetReqSuccess(false)}
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Get OTP Again
                </button>
              </p>
            </>
          ) : passwordResetReqSuccess && otpVerified ? (
            <>
              <form
                noValidate
                className="space-y-5"
                action="#"
                method="POST"
                onSubmit={handleResetPassword}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      noValidate
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      noValidate
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Reset Password
                  </button>
                </div>
              </form>

              <p className="mt-5 text-end text-sm">
                <Link
                  to={"/login"}
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Back To Login
                </Link>
              </p>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default PassReset;
