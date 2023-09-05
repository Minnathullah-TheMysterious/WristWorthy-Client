import toast from "react-hot-toast";

export const addToWishList = async (product) => {
  try {
    const response = await fetch("http://localhost:5000/wishLists", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      toast.success("Added To WishList");
      return data;
    } else {
      const errorData = await response.json();
      toast.error("Failed To Add To WishList");
      return errorData.message || "Failed to add to WishList";
    }
  } catch (error) {
    toast.error("Something Went Wrong While Adding To WishList");
    console.error("Something Went Wrong While Adding To WishList", error);
    return "Something Went Wrong While Adding To WishList";
  }
};

export const fetchWishList = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/wishLists?user_id=${userId}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return errorData.message || "Failed to fetch WishList";
    }
  } catch (error) {
    toast.error("Something Went Wrong While fetching WishList");
    console.error("Something Went Wrong While fetching WishList", error);
    return "Something Went Wrong While fetching WishList";
  }
};

export const deleteWishListItem = async (wishListId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/wishLists/${wishListId}`,
      { method: "DELETE" }
    );
    console.log(response);
    if (response.ok) {
      toast.success("Item removed from WishList");
      return wishListId;
    } else {
      toast.error("Failed To Remove Item From WishList");
      return;
    }
  } catch (error) {
    toast.error("Something Went Wrong While deleting WishList Item");
    console.error("Something Went Wrong While deleting WishList Item", error);
    return;
  }
};
