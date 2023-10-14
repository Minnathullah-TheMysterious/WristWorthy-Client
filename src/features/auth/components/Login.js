import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useDispatch } from "react-redux";
import { loginAsync } from "../authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [phoneInputDisabled, setPhoneInputDisabled] = useState(false);
  const [emailInputDisabled, setEmailInputDisabled] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const loginData = { password, username: phone || email };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const actionResult = await dispatch(loginAsync(loginData));
      if (loginAsync.fulfilled.match(actionResult)) {
        localStorage.removeItem("user_id");
        navigate(location.state || "/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
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
            Sign in to your account
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleLoginSubmit}
          >
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900 mb-3"
              >
                Phone
              </label>
              <PhoneInput
                defaultCountry="IN"
                id="phone"
                name="phone"
                type="tel"
                autoComplete="phone"
                disabled={phoneInputDisabled}
                value={phone}
                onChange={handlePhoneInputChange}
                className="disabled:bg-gray-200 w-full pl-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to={"/req-password-reset"}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-end text-sm text-gray-500">
            Do not have an account?{" "}
            <Link
              to={"/register"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create One
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
