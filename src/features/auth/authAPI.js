import axios from "axios";
import toast from "react-hot-toast";

export const register = async (registrationData) => {
  try {
    const response = await axios.post(
      "/api/v1/auth/register",
      registrationData
    );

    const { success, message } = response.data;

    if (success) {
      toast.success(message);
      return response.data;
    }

    toast.error(message);
    return response.data;
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
    }

    toast.error(
      error?.response?.data?.message || "Something Went Wrong While Registering"
    );
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something Went Wrong While Registering",
    };
  }
};

export const login = async (loginData) => {
  try {
    const { data } = await axios.post("/api/v1/auth/login", loginData);
    const { success, message, user } = data;

    if (success) {
      toast.success(message);
      return { success, message, user };
    }

    toast.error(message);
    return { success, message };
  } catch (error) {
    if (error.response.status === 401) {
      toast.error(error?.response?.data?.message || "Invalid Credentials");
      return { success: false, message: error?.response?.data?.message };
    } else if (error.response.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    } else if (error.response.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    }

    toast.error(
      error?.response?.data?.message || "Something Went Wrong While login"
    );
    return {
      success: false,
      message:
        error?.response?.data?.message || "Something Went Wrong While login",
    };
  }
};

export const logout = async () => {
  try {
    const { data } = await axios.post("/api/v1/auth/logout");
    const { success, message } = data;

    if (success) {
      toast.success(message);
      return { success, message };
    }

    toast.error(message || "Failed To Logout");
    return { success: false, message: message || "Failed To Logout" };
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Something Went Wrong While logout"
    );
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
    }

    toast.error("Error in fetching auth data");
    return data;
  } catch (error) {
    return {
      success: false,
      message:
        error.message ||
        "Something went wrong while fetching the authentication data",
    };
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
    }

    toast.error(message);
    return success;
  } catch (error) {
    if (error?.response?.status === 404) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else if (error?.response?.status === 400) {
      toast.error(error?.response?.data.message);
      return { success: false, message: error?.response?.data?.message };
    } else if (error?.response?.status === 500) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    }

    toast.error(
      error?.response?.data?.message ||
        "Something went wrong in requesting the password reset"
    );
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong in requesting the password reset",
    };
  }
};

export const requestPasswordResetMail = async (email, resetPasswordLink) => {
  try {
    const { data } = await axios.post("/api/v1/auth/req-password-reset-mail", {
      email,
      resetPasswordLink,
    });
    const { success, message } = data;

    if (success) {
      toast.success(message);
      return data;
    }

    toast.error(message);
    return data;
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
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong in requesting the password reset"
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
    }

    toast.error(message);
    return success;
  } catch (error) {
    if (error?.response?.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else if (error.response.status === 401) {
      toast.error(error.response.data.message);
      return { success: false, message: error?.response?.data?.message };
    } else if (error.response.status === 404) {
      toast.error(error.response.data.message);
      return { success: false, message: error?.response?.data?.message };
    }

    toast.error(
      error?.response?.data?.message ||
        "Something Went Wrong in OTP Verification"
    );
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something Went Wrong in OTP Verification",
    };
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
    }

    toast.error(message);
    return success;
  } catch (error) {
    if (error?.response?.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else if (error?.response?.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    }

    toast.error(
      error?.response?.data?.message ||
        "Something Went Wrong While Password Reset"
    );
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something Went Wrong While Password Reset",
    };
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

    if (success) {
      toast.success(message);
      return data;
    }

    toast.error(message);
    return data;
  } catch (error) {
    if (error?.response?.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else if (error?.response?.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    }

    toast.error(
      error?.response?.data?.message ||
        "Something Went Wrong While Password Reset"
    );
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something Went Wrong While Password Reset",
    };
  }
};
