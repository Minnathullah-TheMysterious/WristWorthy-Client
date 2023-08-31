import axios from "axios";
import toast from "react-hot-toast";

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
