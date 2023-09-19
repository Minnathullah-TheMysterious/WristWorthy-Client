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

export const addUserAddress = async (addressData, uId) => {
  console.log("Address: ", addressData, "\n user id:", uId);
  try {
    const { data } = await axios.post(
      `/api/v1/auth/add-user-address/${uId}`,
      addressData
    );

    console.log(data);
    const { success, message } = data;

    if (success) {
      console.log(message);
      toast.success(message);
      return data;
    } else {
      console.log(message);
      toast.error(message);
      return { success, message };
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      toast(error.response.data.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: "Please Fill All the required Fields" };
    } else if (error?.response?.status === 404) {
      toast.error(error.response.data.message);
      return { success: false, message: "User Not Found" };
    } else {
      console.log(error);
      toast.error("Something Went Wrong in adding the address - Client");
      return {
        success: false,
        message: "Something Went Wrong in API Call for adding the address",
      };
    }
  }
};

export const deleteUserAddress = async (userId, addressId) => {
  try {
    const response = await axios.delete(
      `/api/v1/auth/delete-user-address/${userId}/${addressId}`
    );
    const { success, message, userPostDelete } = response.data;
    console.log(success, message);

    if (success) {
      toast.success(message);
      return userPostDelete;
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

export const updateUserAddress = async (userId, addressId, addressData) => {
  try {
    const { data } = await axios.put(
      `/api/v1/auth/update-user-address/${userId}/${addressId}`,
      JSON.parse(addressData)
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
    if (error?.response?.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    } else if (error?.response?.status === 400) {
      toast(error.response.data.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else {
      toast.error("Something Went Wrong While Deleting The Address");
      console.error(
        "Something Went Wrong while deleting the address - Client",
        error
      );
      return {
        success: false,
        message: "Something Went Wrong While Deleting The Address",
      };
    }
  }
};

export const placeOrder = async (userId, order) => {
  try {
    const response = await fetch("http://localhost:5000/orders", {
      method: "POST",
      body: JSON.stringify({ user_id: userId, order }),
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

//backend
export const myPlaceOrder = async (
  userId,
  products,
  totalItems,
  totalAmount,
  selectedUserAddress,
  selectedPaymentMethod
) => {
  try {
    const { data } = await axios.post(`/api/v1/order/place-order/${userId}`, {
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
    } else {
      toast.error(message);
      return { success, message };
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    } else {
      toast.error(error?.response?.data?.message);
      console.error(
        "Something Went Wrong while deleting the address - Client",
        error
      );
      return {
        success: false,
        message: "Something Went Wrong While Deleting The Address",
        error: error?.response?.data?.message,
      };
    }
  }
};

export const fetchAllOrders = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/orders?user_id=${userId}`
    );

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
};

//backend
export const fetchAllUserOrders = async (userId) => {
  try {
    console.log(userId)
    const {data} = await axios.get(`/api/v1/order/get-user-orders/${userId}`)
    console.log(data)
    const {success, message} = data
    if(success){
      // toast.success(message)
      return data
    }else{
      toast.error(message)
      return {success, message}
    }
  } catch (error) {
    if (error?.response?.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    } else {
      toast.error(error?.response?.data?.message);
      console.error(
        "Something Went Wrong while fetching all the user orders - Client",
        error
      );
      return {
        success: false,
        message: error?.response?.data?.message,
      };
    }
  }
};
