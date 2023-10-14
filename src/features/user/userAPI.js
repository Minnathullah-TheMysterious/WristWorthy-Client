import axios from "axios";
import toast from "react-hot-toast";

export const getUser = async () => {
  try {
    const { data } = await axios.get(`/api/v1/user/own/info`);
    return data;
  } catch (error) {
    return {
      success: false,
      message: error.message || error?.response?.data?.message,
    };
  }
};

export const addUserAddress = async (addressData) => {
  try {
    const { data } = await axios.post(
      `/api/v1/user/own/add-address`,
      addressData
    );

    const { success, message } = data;

    if (success) {
      toast.success(message);
      return data;
    }

    toast.error(message);
    return { success, message };
  } catch (error) {
    if (error?.response?.status === 400) {
      toast(error.response.data.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return {
        success: false,
        message:
          error.response.data.message || "Please Fill All the required Fields",
      };
    } else if (error?.response?.status === 404) {
      toast.error(error.response.data.message);
      return {
        success: false,
        message: error.response.data.message || "User Not Found",
      };
    }

    toast.error(
      error.response.data.message ||
        "Something Went Wrong in adding the address - Client"
    );
    return {
      success: false,
      message:
        error.response.data.message ||
        "Something Went Wrong in API Call for adding the address",
    };
  }
};

export const deleteUserAddress = async (addressId) => {
  try {
    const response = await axios.delete(
      `/api/v1/user/own/delete-address/${addressId}`
    );
    const { success, message, userPostDelete } = response.data;

    if (success) {
      toast.success(message);
      return userPostDelete;
    }

    toast.error(message);
    return success;
  } catch (error) {
    if (error?.response?.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    }

    toast.error(
      error?.response?.data?.message ||
        "Something Went Wrong While Deleting The Address"
    );
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something Went Wrong While Deleting The Address",
    };
  }
};

export const updateUserAddress = async (addressId, addressData) => {
  try {
    const { data } = await axios.put(
      `/api/v1/user/own/update-address/${addressId}`,
      JSON.parse(addressData)
    );
    const { success, message } = data;

    if (success) {
      toast.success(message);
      return data;
    }

    toast.error(message);
    return { success, message };
  } catch (error) {
    if (error?.response?.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    } else if (error?.response?.status === 400) {
      toast(error.response.data.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    }

    toast.error(
      error?.response?.data?.message ||
        "Something Went Wrong While Deleting The Address"
    );
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something Went Wrong While Deleting The Address",
    };
  }
};

export const placeOrder = async (
  products,
  totalItems,
  totalAmount,
  selectedUserAddress,
  selectedPaymentMethod
) => {
  try {
    const { data } = await axios.post(`/api/v1/order/user/place-order`, {
      products,
      totalAmount,
      totalItems,
      shippingAddress: selectedUserAddress,
      paymentMethod: selectedPaymentMethod,
    });

    const { success, message } = data;

    if (success) {
      toast.success(message);
      return data;
    }

    toast.error(message);
    return { success, message };
  } catch (error) {
    if (error?.response?.status === 400) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    }

    toast.error(
      error?.response?.data?.message ||
        "Something Went Wrong While placing the order"
    );
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something Went Wrong While placing the order",
    };
  }
};

export const fetchUserOrders = async () => {
  try {
    const { data } = await axios.get(`/api/v1/order/user/get-orders`);
    const { success, message } = data;

    if (success) {
      return data;
    }

    toast.error(message);
    return { success, message };
  } catch (error) {
    if (error?.response?.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    } else {
      toast.error(error?.response?.data?.message);
      return {
        success: false,
        message: error?.response?.data?.message,
      };
    }
  }
};

export const cancelOrder = async (orderId) => {
  try {
    const { data } = await axios.put(
      `/api/v1/order/user/cancel-order/${orderId}`
    );
    const { success, message } = data;

    if (success) {
      toast.success(message);
      return data;
    }

    toast.error(message);
    return { success, message };
  } catch (error) {
    if (error?.response?.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    }

    toast.error(
      error?.response?.data?.message ||
        "Something Went Wrong while cancelling the order"
    );
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something Went Wrong while cancelling the order",
    };
  }
};
