import axios from "axios";
import toast from "react-hot-toast";

export const getUser = async (userId) => {
  try {
    const { data } = await axios.get(`/api/v1/auth/user-info/${userId}`);
    return data?.user;
  } catch (error) {
    console.error("Something Went Wrong in fetching the User - Client", error);
  }
};

export const deleteUserAddress = async (userId, addressId) => {
  try {
    const response = await axios.delete(
      `/api/v1/auth/delete-user-address/${userId}/${addressId}`
    );
    const { success, message, userDataPostDelete } = response.data;
    console.log(success, message);

    if (success) {
      toast.success(message);
      return userDataPostDelete;
    } else {
      toast.error(message);
      return success;
    }
  } catch (error) {
    if (error?.response?.status === 404) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("Something Went Wrong While Deleting The Address");
      console.error(
        "Something Went Wrong while deleting the address - Client",
        error
      );
    }
  }
};

export const placeOrder = async (userId, order) => {
  try {
    const response = await fetch("http://localhost:5000/orders", {
      method: "POST",
      body: JSON.stringify({user_id:userId, order}),
      headers: { "content-type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      toast.success("Order Placed Successfully");
      return data;
    } else {
      const errorData = await response.json();
      console.error(errorData);
      toast.error("Failed To Place Order");
      throw new Error(errorData.message || "Failed to Place Order");
    }
  } catch (error) {
    console.error("Something Went Wrong While Placing Order", error);
  }
};

export const fetchAllOrders = async(userId)=>{
  try {
    const response = await fetch(`http://localhost:5000/orders?user_id=${userId}`);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      console.error(errorData);
      toast.error("Failed To all orders");
      throw new Error(errorData.message || "Failed to all orders");
    }
  } catch (error) {
    console.error("Something Went Wrong While fetching orders", error);
  }
}