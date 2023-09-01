import toast from "react-hot-toast";

//in server we will need to add items based on the user cart availability
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
      throw new Error(errorData.message || "Failed to add item to cart");
    }
  } catch (error) {
    console.error("Something Went Wrong While adding item to Cart", error);
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

export const deleteUserCartItem = async (cartId) => {
  //in server we will need to delete based on user also. here we don't need that
  const URL = `http://localhost:5000/carts/${cartId}`;

  try {
    const response = await fetch(URL, { method: "DELETE" });
    if (response.ok) {
      return cartId
    }
  } catch (error) {
    console.error("Failed to fetch cart", error);
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
