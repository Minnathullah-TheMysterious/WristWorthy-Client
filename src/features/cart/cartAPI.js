import toast from "react-hot-toast";
import axios from "axios";

export const addMyItemToCart = async (userId, productId) => {
  try {
    const { data } = await axios.post(
      `/api/v1/cart/add-to-cart/${userId}/${productId}`
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

export const fetchUserCartItems = async (userId) => {
  try {
    const { data } = await axios.get(`/api/v1/cart/get-cart-items/${userId}`);
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

export const deleteMyUserCartItem = async (userId, productId) => {
  try {
    const { data } = await axios.delete(
      `/api/v1/cart/delete-cart-item/${userId}/${productId}`
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
        error
      );
    }
  }
};

export const resetMyCart = async (userId) => {
  try {
    const { data } = await axios.delete(`/api/v1/cart/delete-cart/${userId}`);
    const { success, message } = data;
    if (success) {
      toast.success(message);
      return success;
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
    }else if(error.response && error.response.status === 404){
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
    } else {
      toast.error(error?.response?.data?.message);
      console.error(
        "Something Went Wrong While deleting the user cart - Client",
        error
      );
    }
  }
};

export const updateMyCartItemQuantity = async (userId, productId, quantity) => {
  try {
    const { data } = await axios.put(
      `/api/v1/cart/update-product-quantity/${userId}/${productId}/${quantity}`
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
