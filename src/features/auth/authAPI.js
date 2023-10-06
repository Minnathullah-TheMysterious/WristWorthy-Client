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
      return response.data;
    } else {
      console.log("Registration not successful.");
      console.log("Response status:", response.status);
      console.log("Error message:", message);
      toast.error(message);
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else if (error.response && error.response.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else {
      toast.error(
        error?.response?.data?.message ||
          "Something Went Wrong While Registering"
      );
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Something Went Wrong While Registering",
      };
    }
  }
};

export const login = async (loginData) => {
  try {
    const { data } = await axios.post("/api/v1/auth/login", loginData);
    const { success, message, user } = data;

    if (success) {
      toast.success(message);
      return { success, message, user };
    } else {
      toast.error("Invalid Credentials");
      return { success, message: "Invalid Credentials" };
    }
  } catch (error) {
    if (error.response.status === 401) {
      toast.error("Invalid Credentials");
      return { success: false, message: "Invalid Credentials" };
    } else if (error.response.status === 404) {
      toast.error("Invalid Credentials");
      return { success: false, message: "Invalid Credentials" };
    } else if (error.response.status === 400) {
      toast("Fill The Required Fields", {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: "Fill The Required Fields" };
    } else {
      toast.error(
        error?.response?.data?.message || "Something Went Wrong While login"
      );
      console.error("Something Went Wrong While login - Client", error);
    }
  }
};

export const logout = async () => {
  try {
    const { data } = await axios.post("/api/v1/auth/logout");
    const { success, message } = data;

    if (success) {
      toast.success(message);
      return { success, message };
    } else {
      toast.error("Failed To Logout");
      return { success: false, message: "Failed To Logout" };
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Something Went Wrong While logout"
    );
    console.error("Something Went Wrong While login - Client", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Failed To Logout",
    };
  }
};

export const getAuthData = async () => {
  try {
    const { data } = await axios.get(`/api/v1/user/own/info`);
    const { success, user } = data;

    if (success) {
      return {
        _id: user?._id,
        role: user?.role,
      };
    } else {
      toast.error("Error in fetching auth data");
      return data;
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
      /* The `toast` function is used to display a notification message to the user. In this case,
      `toast(error?.response?.data?.message, { className: "font-serif bg-blue-900 text-white" })` is
      displaying an error message to the user. */
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

export const requestPasswordResetMail = async (email, resetPasswordLink) => {
  console.log(resetPasswordLink);
  try {
    const { data } = await axios.post("/api/v1/auth/req-password-reset-mail", {
      email,
      resetPasswordLink,
    });
    const { success, message } = data;
    if (success) {
      toast.success(message);
      return data;
    } else {
      toast.error(message);
      return data;
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else if (error?.response?.status === 404) {
      toast.error(error?.response?.data.message);
      return { success: false, message: error?.response?.data?.message };
    } else if (error?.response?.status === 500) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    } else {
      toast.error("Something went wrong in requesting the password reset");
      console.error(
        "Something went wrong in requesting the password reset - Client",
        error
      );
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Something went wrong in requesting the password reset",
      };
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

export const resetPasswordMail = async (
  email,
  newPassword,
  confirmNewPassword,
  token
) => {
  try {
    const { data } = await axios.post(`/api/v1/auth/reset-password`, {
      email,
      newPassword,
      confirmNewPassword,
      token,
    });
    const { success, message } = data;
    console.log(data);

    if (success) {
      toast.success(message);
      return data;
    } else {
      toast.error(message);
      return data;
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else if (error?.response?.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    } else {
      toast.error(
        error?.response?.data?.message ||
          "Something Went Wrong While Password Reset"
      );
      console.error("Something Went Wrong in Password Reset - Client", error);
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Something Went Wrong While Password Reset",
      };
    }
  }
};
