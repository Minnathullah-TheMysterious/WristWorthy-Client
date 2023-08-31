import axios from "axios";
import toast from "react-hot-toast";

export const addUserAddress = async (addressData, uId, token) => {
  console.log("Address: ", addressData, "\n token:", token, '\n user id:',uId);
  try {
    const response = await axios.post(
      `/api/v1/auth/add-user-address/${uId}`,
      addressData,
      { headers: { Authorization: token } }
    );

    console.log(response.data);
    const { success, message } = response.data;

    if (success) {
      console.log(message);
      toast.success(message);
      return response.data
    } else {
      console.log(message);
      toast.error(message);
      return response.data
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      toast.error(error.response.data.message);
    } else if (error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      console.log(error);
      toast.error("Something Went Wrong in adding the address - Client");
    }
  }
};
