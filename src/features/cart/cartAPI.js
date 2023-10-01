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
    } else {
      toast.error(message);
      return { success, message };
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
      toast.error("Something Went Wrong While Adding Item to Cart");
    }
    console.error("Something Went Wrong While Registering - Client", error);
  }
};

export const fetchUserCartItems = async () => {
  try {
    const { data } = await axios.get(`/api/v1/cart/user/get-cart-items`);
    const { success, message } = data;
    if (success) {
      // toast.success(message);
      return data;
    } else {
      // toast.error(message);
      return { success, message };
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
    } else {
      // toast.error(error?.response?.data?.message);
      console.error(
        "Something Went Wrong While fetching user cart items - Client",
        error
      );
    }
  }
};

export const deleteUserCartItem = async (productId) => {
  console.log(productId);
  try {
    const { data } = await axios.delete(
      `/api/v1/cart/user/delete-cart-item/${productId}`
    );
    const { success, message } = data;
    if (success) {
      toast.success(message);
      return data;
    } else {
      toast.error(message);
      return { success, message };
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
    } else if (error.response && error.response.status === 404) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error(error?.response?.data?.message);
      console.error(
        "Something Went Wrong While deleting the cart Item - Client",
        error.message
      );
    }
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
      console.error(error?.response?.data?.message);
    } else if (error.response && error.response.status === 404) {
      console.error(error?.response?.data?.message);
    } else {
      toast.error(error?.response?.data?.message);
      console.error(
        "Something Went Wrong While deleting the user cart - Client",
        error
      );
    }
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
    } else {
      toast.error(message);
      return { success, message };
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
    } else if (error.response && error.response.status === 404) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error(error?.response?.data?.message);
      console.error(
        "Something Went Wrong While updating the quantity - Client",
        error
      );
    }
  }
};
