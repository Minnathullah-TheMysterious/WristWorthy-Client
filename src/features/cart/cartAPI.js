import toast from "react-hot-toast";
import axios from "axios";

export const addItemToCart = async (productId) => {
  try {
    const { data } = await axios.post(
      `/api/v1/cart/user/add-to-cart/${productId}`
    );
    const { success, message } = data;

    if (success) {
      toast.success(message);
      return data;
    }

    toast.error(message);
    return { success, message };
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
      error?.response?.data?.message ||
        "Something Went Wrong While Adding Item to Cart"
    );
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something Went Wrong While Adding Item to Cart",
    };
  }
};

export const fetchUserCartItems = async () => {
  try {
    const { data } = await axios.get(`/api/v1/cart/user/get-cart-items`);
    const { success, message } = data;

    if (success) {
      return data;
    }

    return { success, message };
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    }
    
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong while fetching cart",
    };
  }
};

export const deleteUserCartItem = async (productId) => {
  try {
    const { data } = await axios.delete(
      `/api/v1/cart/user/delete-cart-item/${productId}`
    );
    const { success, message } = data;

    if (success) {
      toast.success(message);
      return data;
    }

    toast.error(message);
    return { success, message };
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else if (error.response && error.response.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    }

    toast.error(
      error?.response?.data?.message ||
        "Something went wrong while deleting cart item"
    );
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong while deleting cart item",
    };
  }
};

export const resetCart = async () => {
  try {
    const { data } = await axios.delete(`/api/v1/cart/user/delete-cart`);
    const { success } = data;

    if (success) {
      return success;
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else if (error.response && error.response.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    }

    toast.error(
      error?.response?.data?.message ||
        "Something went wrong while resetting the cart"
    );
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong while resetting the cart",
    };
  }
};

export const updateCartItemQuantity = async (productId, quantity) => {
  try {
    const { data } = await axios.put(
      `/api/v1/cart/user/update-product-quantity/${productId}/${quantity}`
    );
    const { success, message } = data;

    if (success) {
      toast.success(message);
      return data;
    }

    toast.error(message);
    return { success, message };
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else if (error.response && error.response.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    }

    toast.error(
      error?.response?.data?.message ||
        "Something went wrong while updating cart item quantity"
    );
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong while updating cart item quantity",
    };
  }
};
