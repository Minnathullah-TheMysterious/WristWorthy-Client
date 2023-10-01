import toast from "react-hot-toast";
import axios from "axios";

export const addToWishlist = async (productId) => {
  try {
    const { data } = await axios.post(
      `/api/v1/wishlist/user/add-to-wishlist/${productId}`
    );
    const { success, message } = data;
    if (success) {
      toast.success(message);
      return data;
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else {
      toast.error(error?.response?.data?.message);
      console.error("Something Went Wrong While Adding To Wishlist", error);
      return { success: false, message: error?.response?.data?.message };
    }
  }
};

export const fetchWishlist = async () => {
  try {
    const { data } = await axios.get(`/api/v1/wishlist/user/get-wishlist`);
    const { success, wishlist } = data;
    if (success) {
      // toast.success(message);
      return wishlist;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else {
      toast.error("Something Went Wrong While fetching Wishlist");
      console.error("Something Went Wrong While fetching Wishlist", error);
      return {
        success: false,
        message: "Something Went Wrong While fetching Wishlist",
      };
    }
  }
};

export const deleteWishlistItem = async (productId) => {
  try {
    const { data } = await axios.delete(
      `/api/v1/wishlist/user/delete-wishlist-item/${productId}`
    );
    const { success, message, wishlist } = data;
    if (success) {
      toast.success(message);
      console.log(wishlist);
      return wishlist;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else if (error.response && error.response.status === 409) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else {
      toast.error("Something Went Wrong While deleting Item from Wishlist");
      console.error(
        "Something Went Wrong While deleting Item from Wishlist",
        error
      );
      return {
        success: false,
        message: "Something Went Wrong While deleting Item from Wishlist",
        error: error.message,
      };
    }
  }
};
