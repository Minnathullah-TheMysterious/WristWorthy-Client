import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const OtpVerify = () => {
  const [newPassword, setNewPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmitOtpAndResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/v1/auth/verify-otp-change-password",
        { phone, otp, newPassword, confirmNewPassword }
      );

      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        navigate("/login");
      } else {
        toast.error(message);
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      } else if (error.response.status === 401) {
        toast.error(error.response.data.message);
      } else if (error.response.status === 404) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          "Something Went Wrong in OTP Verification and Password Reset - Client"
        );
        console.error(
          "Something Went Wrong in OTP Verification and Password Reset - Client",
          error
        );
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="images/logo256.png"
            alt="WristWorthy"
          />
          <h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            OTP Verification & Password Reset
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-5"
            action="#"
            method="POST"
            onSubmit={handleSubmitOtpAndResetPassword}
          >
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
                  required
                  value={phone}
                  onChange={setPhone}
                  defaultCountry="IN"
                  className="w-full rounded-md border-0 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

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

          <p className="mt-5 text-end text-sm text-gray-500">
            <Link
              to="/req-password-reset"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Get OTP Again
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default OtpVerify;
