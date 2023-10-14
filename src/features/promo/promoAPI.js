import axios from "axios";
import toast from "react-hot-toast";

export const fetchPromo = async () => {
  try {
    const { data } = await axios.get("/api/v1/promo/get-promo");

    return data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    }

    toast.error(
      error.message || "Something Went Wrong while fetching the promo"
    );
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something Went Wrong while fetching the promo",
    };
  }
};
