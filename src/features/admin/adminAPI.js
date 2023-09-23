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
      toast.error("Something Went Wrong While creating the product");
      return {
        success: false,
        message: "Something Went Wrong While creating the product",
      };
    }
  }
};

//Delete Product
export const deleteProduct = async (productId) => {
  try {
    const { data } = await axios.delete(
      `/api/v1/product/delete-product/${productId}`
    );
    const { success, message } = data;
    if (success) {
      toast.success(message);
      return success;
    } else {
      toast.error(message);
      return success;
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else {
      console.error("something went wrong while deleting the product", error);
      toast.error(
        error?.response?.data?.message ||
          "Something Went Wrong While deleting the product"
      );
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Something Went Wrong While deleting the product",
      };
    }
  }
};

//Restore Product
export const restoreProduct = async (productId) => {
  try {
    const { data } = await axios.put(
      `/api/v1/product/restore-product/${productId}`
    );
    const { success, message } = data;
    if (success) {
      toast.success(message);
      return success;
    } else {
      toast.error(message);
      return success;
    }
  } catch (error) {
    if (error.response && error.response.status === 409) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else {
      console.error("something went wrong while restoring the product", error);
      toast.error(
        error?.response?.data?.message ||
          "Something Went Wrong While restoring the product"
      );
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Something Went Wrong While restoring the product",
      };
    }
  }
};

//Update Product Data
export const updateProductData = async (productId, productData) => {
  try {
    const { data } = await axios.put(
      `/api/v1/product/update-product/${productId}`,
      productData
    );
    const { success, message } = data;
    if (success) {
      toast.success(message);
      return data;
    } else {
      toast.error(message);
      return data;
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else {
      console.error("something went wrong while updating the product", error);
      toast.error(
        error?.response?.data?.message ||
          "Something Went Wrong While updating the product"
      );
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Something Went Wrong While updating the product",
      };
    }
  }
};

//Change/update Product thumbnail
export const updateProductThumbnail = async (productId, thumbnail) => {
  console.log(productId, thumbnail);
  try {
    const { data } = await axios.put(
      `/api/v1/product/update-product-thumbnail/${productId}`,
      thumbnail
    );
    const { success, message } = data;
    if (success) {
      toast.success(message);
      return data;
    } else {
      toast.error(message);
      return data;
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else if (error.response && error.response.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    } else {
      console.error(
        "something went wrong while updating the product thumbnail",
        error
      );
      toast.error(
        error?.response?.data?.message ||
          "Something Went Wrong While updating the product thumbnail"
      );
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Something Went Wrong While updating the product thumbnail",
      };
    }
  }
};

//Change/update Product image
export const updateProductImage = async (productId, image, imageIndex) => {
  try {
    const { data } = await axios.put(
      `/api/v1/product/update-product-image/${productId}/${imageIndex}`,
      image
    );
    const { success, message } = data;
    if (success) {
      toast.success(message);
      return data;
    } else {
      toast.error(message);
      return data;
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else if (error.response && error.response.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    } else {
      console.error(
        "something went wrong while updating the product image",
        error
      );
      toast.error(
        error?.response?.data?.message ||
          "Something Went Wrong While updating the product image"
      );
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Something Went Wrong While updating the product image",
      };
    }
  }
};

//Create Category
export const createCategory = async (newCategory) => {
  try {
    const { data } = await axios.post(
      "/api/v1/category/create-category",
      newCategory
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
      console.error("something went wrong while creating the category", error);
      toast.error("Something Went Wrong While creating the category");
      return {
        success: false,
        message: "Something Went Wrong While creating the category",
      };
    }
  }
};

//Delete Category
export const deleteCategory = async (categoryId) => {
  try {
    const { data } = await axios.delete(
      `/api/v1/category/delete-category/${categoryId}`
    );
    const { success, message } = data;
    if (success) {
      toast.success(message);
      return success;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    } else {
      console.error("something went wrong while Deleting the Category", error);
      toast.error(
        error?.response?.data?.message ||
          "Something Went Wrong While Deleting the Category"
      );
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Something Went Wrong While Deleting the Category",
      };
    }
  }
};

//Delete Category
export const restoreCategory = async (categoryId) => {
  try {
    const { data } = await axios.put(
      `/api/v1/category/restore-category/${categoryId}`
    );
    const { success, message } = data;
    if (success) {
      toast.success(message);
      return success;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    } else {
      console.error("something went wrong while Restoring the Category", error);
      toast.error(
        error?.response?.data?.message ||
          "Something Went Wrong While Restoring the Category"
      );
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Something Went Wrong While Restoring the Category",
      };
    }
  }
};

//Create Brand
export const createBrand = async (newBrand) => {
  try {
    const { data } = await axios.post("/api/v1/brand/create-brand", newBrand);
    const { success, message } = data;
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
      console.error("something went wrong while creating the Brand", error);
      toast.error("Something Went Wrong While creating the Brand");
      return {
        success: false,
        message: "Something Went Wrong While creating the Brand",
      };
    }
  }
};

//Delete Brand
export const deleteBrand = async (brandId) => {
  try {
    const { data } = await axios.delete(
      `/api/v1/brand/delete-brand/${brandId}`
    );
    const { success, message } = data;
    if (success) {
      toast.success(message);
      return success;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    } else {
      console.error("something went wrong while Deleting the Brand", error);
      toast.error(
        error?.response?.data?.message ||
          "Something Went Wrong While creating the Brand"
      );
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Something Went Wrong While creating the Brand",
      };
    }
  }
};

//Restore Brand
export const restoreBrand = async (brandId) => {
  try {
    const { data } = await axios.put(`/api/v1/brand/restore-brand/${brandId}`);
    const { success, message } = data;
    if (success) {
      toast.success(message);
      return success;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    } else {
      console.error("something went wrong while Restoring the Brand", error);
      toast.error(
        error?.response?.data?.message ||
          "Something Went Wrong While Restoring the Brand"
      );
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Something Went Wrong While Restoring the Brand",
      };
    }
  }
};

//Update Brand Name
export const updateBrandName = async (brandId, brand_name) => {
  try {
    const { data } = await axios.put(`/api/v1/brand/update-brand/${brandId}`, {
      brand_name,
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
    if (error.response && error.response.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    } else if (error.response && error.response.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else {
      console.error(
        "something went wrong while updating the Brand name",
        error
      );
      toast.error(
        error?.response?.data?.message ||
          "Something Went Wrong While updating the Brand name"
      );
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Something Went Wrong While updating the Brand name",
      };
    }
  }
};

//Update Brand Image
export const updateBrandImage = async (brandId, image) => {
  try {
    const { data } = await axios.put(
      `/api/v1/brand/update-brand-image/${brandId}`, image
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
    if (error.response && error.response.status === 404) {
      toast.error(error?.response?.data?.message);
      return { success: false, message: error?.response?.data?.message };
    } else if (error.response && error.response.status === 400) {
      toast(error?.response?.data?.message, {
        className: "font-serif bg-blue-900 text-white",
      });
      return { success: false, message: error?.response?.data?.message };
    } else {
      console.error(
        "something went wrong while updating the Brand image",
        error
      );
      toast.error(
        error?.response?.data?.message ||
          "Something Went Wrong While updating the Brand image"
      );
      return {
        success: false,
        message:
          error?.response?.data?.message ||
          "Something Went Wrong While updating the Brand image",
      };
    }
  }
};
