import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const PassReset = () => {
  const [phoneInputDisabled, setPhoneInputDisabled] = useState(false);
  const [emailInputDisabled, setEmailInputDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

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

  const handlePasswordResetReqSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/auth/req-password-reset", {
        phone,
        email,
      });
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        navigate("/verify-otp-change-password");
      } else {
        toast.error(message);
      }
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(error.response.data.message);
      } else if (error.response.status === 400) {
        toast.error(error.response.data.message);
      } else if (error.response.status === 500) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          "Something went wrong in requesting the password reset - Client"
        );
        console.error(
          "Something went wrong in requesting the password reset - Client",
          error
        );
      }
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
          <form
            className=""
            action="#"
            method="POST"
            onSubmit={handlePasswordResetReqSubmit}
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

            <div>
              <button
                type="submit"
                className="mt-6 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get OTP
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
        </div>
      </div>
    </>
  );
};

export default PassReset;
