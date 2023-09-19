import toast from "react-hot-toast";
import axios from "axios";

export const addItemToCart = async (cartItem) => {
  const URL = `http://localhost:5000/carts`;

  try {
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(cartItem),
      headers: { "content-type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      console.error(errorData);
      toast.error("Failed To Add To Cart");
      return errorData.message || "Failed to add item to cart";
    }
  } catch (error) {
    console.error("Something Went Wrong While adding item to Cart", error);
  }
};

//backend
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

export const fetchUserCart = async (uId) => {
  const URL = `http://localhost:5000/carts?user_id=${uId}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Failed To Fetch Cart");
    console.error("Failed to fetch cart", error);
  }
};

//backend
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
      toast.error(error?.response?.data?.message);
      console.error(
        "Something Went Wrong While fetching user cart items - Client",
        error
      );
    }
  }
};

export const deleteUserCartItem = async (cartId) => {
  //in server we will need to delete based on user also. here we don't need that
  const URL = `http://localhost:5000/carts/${cartId}`;

  try {
    const response = await fetch(URL, { method: "DELETE" });
    if (response.ok) {
      return cartId;
    }
  } catch (error) {
    console.error("Failed to fetch cart", error);
  }
};

//backend
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

export const resetCart = async (uId) => {
  //in server we can delete based on user . here we can't
  try {
    const cart = await fetchUserCart(uId);
    for (let item of cart) {
      await deleteUserCartItem(item?.id);
    }
    return { success: true, message: "Cart Reset Successful" };
  } catch (error) {
    toast.error("Something Went Wrong In Deleting The Cart");
    console.error("Something Went Wrong In Deleting The Cart", error);
  }
};

//backend
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

export const updateCartItemQuantity = async (update) => {
  const URL = `http://localhost:5000/carts/${update.id}`;

  try {
    const response = await fetch(URL, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      console.error(errorData);
      toast.error("Failed To Add To Cart");
      throw new Error(errorData.message || "Failed to add item to cart");
    }
  } catch (error) {
    console.error("Something Went Wrong While adding item to Cart", error);
  }
};

//backend
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
