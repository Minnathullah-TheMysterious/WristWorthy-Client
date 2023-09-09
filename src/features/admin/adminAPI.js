import axios from "axios";
import toast from "react-hot-toast";

//Create Product
export const createProduct = async (newProduct) => {
  try {
    const { data } = await axios.post(
      "/api/v1/product/create-product",
      newProduct
    );
    const { success, message } = data;
    console.log(data);
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
    } else if (error.response && error.response.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else {
      console.error("something went wrong while creating the product", error);
      toast.error("Something Went Wrong While creating product");
      return {
        success: false,
        message: "Something Went Wrong While creating product",
      };
    }
  }
};
