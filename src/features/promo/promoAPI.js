import axios from "axios";
import toast from "react-hot-toast";

export const fetchPromo = async () => {
  console.log('fetchPromo')
  try {
    const { data } = await axios.get("/api/v1/promo/get-promo");

    console.log(data)

    return data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    }
    console.error("Something Went Wrong while fetching the promo", error);
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
