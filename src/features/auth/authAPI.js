import axios from "axios";
import toast from "react-hot-toast";

export const register = async (registrationData) => {
  try {
    console.log("Starting registration...");

    const response = await axios.post(
      "/api/v1/auth/register",
      registrationData
    );

    console.log("Response:", response.data);

    const { success, message } = response.data;
    if (success) {
      console.log("Registration successful.");
      toast.success(message);
      return success;
    } else {
      console.log("Registration not successful.");
      console.log("Response status:", response.status);
      console.log("Error message:", message);
      toast.error(message);
      return success;
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
    } else if (error.response && error.response.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
    } else {
      toast.error("Something Went Wrong While Registering");
    }
    console.error("Something Went Wrong While Registering - Client", error);
  }
};

export const login = async (loginData) => {
  try {
    const response = await axios.post("/api/v1/auth/login", loginData);
    const { success, message, token, user } = response.data;

    if (success) {
      toast.success(message);
      const userWithOutAddressesArray = { ...user };
      delete userWithOutAddressesArray.addresses;
      localStorage.setItem(
        "user",
        JSON.stringify({ token, user_id: user?._id })
      );
      return {success, message, userWithOutAddressesArray};
    } else {
      toast.error(message);
      return {success, message}
    }
  } catch (error) {
    if (error.response.status === 401) {
      toast.error(error.response.data.message);
      return {success:false, message: error.response.data.message}
    } else if (error.response.status === 404) {
      toast.error(error.response.data.message);
      return {success:false, message: error.response.data.message}
    } else if (error.response.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return {success:false, message: error.response.data.message}
    } else {
      toast.error("Something Went Wrong While login");
      console.error("Something Went Wrong While login - Client", error);
    }
  }
};

export const getAuthData = async (uId) => {
  try {
    const response = await axios.get(`/api/v1/auth/user-info/${uId}`);
    const { success, user } = response.data;

    if (success) {
      console.log({
        _id: user?._id,
        user_name: user?.user_name,
        email: user?.email,
        phone: user?.phone,
      });
      return {
        _id: user?._id,
        user_name: user?.user_name,
        email: user?.email,
        phone: user?.phone,
      };
    } else {
      toast.error("Error in fetching auth data");
      return response.data;
    }
  } catch (error) {
    console.error("Something Went Wrong While login - Client", error);
  }
};

export const requestPasswordReset = async (reqResetData) => {
  try {
    const response = await axios.post(
      "/api/v1/auth/req-password-reset",
      reqResetData
    );
    const { success, message, user_id } = response.data;
    if (success) {
      localStorage.setItem("user_id", `${user_id}`);
      toast.success(message);
      return success;
    } else {
      toast.error(message);
      return success;
    }
  } catch (error) {
    if (error?.response?.status === 404) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
    } else if (error?.response?.status === 400) {
      toast.error(error?.response?.data.message);
    } else if (error?.response?.status === 500) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("Something went wrong in requesting the password reset");
      console.error(
        "Something went wrong in requesting the password reset - Client",
        error
      );
    }
  }
};

export const verifyOtp = async (userId, otp) => {
  try {
    const response = await axios.post(`/api/v1/auth/verify-otp/${userId}`, {
      otp,
    });

    const { success, message } = response.data;
    if (success) {
      toast.success(message);
      return success;
    } else {
      toast.error(message);
      return success;
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
    } else if (error.response.status === 401) {
      toast.error(error.response.data.message);
    } else if (error.response.status === 404) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something Went Wrong in OTP Verification");
      console.error("Something Went Wrong in OTP Verification - Client", error);
    }
  }
};

export const resetPassword = async (userId, passwords) => {
  try {
    const response = await axios.post(
      `/api/v1/auth/reset-password/${userId}`,
      passwords
    );
    const { success, message } = response.data;

    if (success) {
      localStorage.removeItem("user_id");
      toast.success(message);
      return success;
    } else {
      toast.error(message);
      return success;
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
    } else if (error?.response?.status === 404) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("Something Went Wrong While Password Reset");
      console.error("Something Went Wrong in Password Reset - Client", error);
    }
  }
};
