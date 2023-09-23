import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchAllProductsByFilters,
  fetchBrands,
  fetchCategories,
  fetchSelectedProduct,
} from "./productAPI";
import {
  createBrand,
  createCategory,
  createProduct,
  deleteBrand,
  deleteCategory,
  deleteProduct,
  restoreBrand,
  restoreCategory,
  restoreProduct,
  updateProductData,
  updateProductImage,
  updateProductThumbnail,
} from "./../admin/adminAPI";

const initialState = {
  loading: false,
  products: [],
  categories: [],
  brands: [],
  totalProductsCount: 0,
  selectedProduct: null,
  error: null,
};

export const fetchAllProductsByFiltersAsync = createAsyncThunk(
  "products/fetchAllProductsByFilters",
  async ({ filter, sort, pagination }) => {
    const response = await fetchAllProductsByFilters(filter, sort, pagination);
    console.log("Products In The Page:", response);
    return response;
  }
);

export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    console.log(response);
    return response;
  }
);

export const fetchSelectedProductAsync = createAsyncThunk(
  "products/fetchSelectedProduct",
  async (productId) => {
    const response = await fetchSelectedProduct(productId);
    return response;
  }
);

export const createProductAsync = createAsyncThunk(
  "products/createProduct",
  async (product) => {
    try {
      const response = await createProduct(product);
      if (response.success) {
        return response?.product;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    try {
      const response = await deleteProduct(productId);
      if (response) {
        return productId;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }
);

export const restoreProductAsync = createAsyncThunk(
  "products/restoreProduct",
  async (productId) => {
    try {
      const response = await restoreProduct(productId);
      if (response) {
        return productId;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }
);

export const updateProductDataAsync = createAsyncThunk(
  "products/updateProductData",
  async ({productId, updatedProduct}) => {
    try {
      const response = await updateProductData(productId, updatedProduct);
      if (response.success) {
        return {product: response.product, productId};
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }
);

export const updateProductThumbnailAsync = createAsyncThunk(
  "products/updateProductThumbnail",
  async ({productId, formData}) => {
    try {
      const response = await updateProductThumbnail(productId, formData);
      if (response.success) {
        return {product: response.product, productId};
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }
);

export const updateProductImageAsync = createAsyncThunk(
  "products/updateProductImage",
  async ({productId, formData, imageIndex}) => {
    try {
      const response = await updateProductImage(productId, formData, imageIndex);
      if (response.success) {
        return {product: response.product, productId};
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "products/fetchBrands",
  async () => {
    const response = await fetchBrands();
    console.log(response?.brands);
    return response?.brands;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await fetchCategories();
    return response?.categories;
  }
);

export const createCategoryAsync = createAsyncThunk(
  "products/createCategory",
  async (category) => {
    try {
      const response = await createCategory(category);
      if (response.success) {
        return response?.category;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }
);

export const createBrandAsync = createAsyncThunk(
  "products/createBrand",
  async (brand) => {
    try {
      const response = await createBrand(brand);
      if (response.success) {
        return response?.brand;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }
);

export const deleteBrandAsync = createAsyncThunk(
  "products/deleteBrand",
  async (brandId) => {
    try {
      const response = await deleteBrand(brandId);
      if (response) {
        return brandId;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }
);

export const restoreBrandAsync = createAsyncThunk(
  "products/restoreBrand",
  async (brandId) => {
    try {
      const response = await restoreBrand(brandId);
      if (response) {
        return brandId;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  "products/deleteCategory",
  async (categoryId) => {
    try {
      const response = await deleteCategory(categoryId);
      if (response) {
        return categoryId;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }
);

export const restoreCategoryAsync = createAsyncThunk(
  "products/restoreCategory",
  async (categoryId) => {
    try {
      const response = await restoreCategory(categoryId);
      if (response) {
        return categoryId;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchAllProductsByFiltersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProductsByFiltersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllProductsByFiltersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.filteredProducts;
        state.totalProductsCount = action.payload.totalCount;
      })

      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.products;
        state.totalProductsCount = action.payload?.totalCount;
      })

      .addCase(fetchSelectedProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSelectedProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSelectedProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })

      .addCase(createProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error
          ? action.error.message
          : "Encountered an error";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state?.products?.push(action.payload);
      })

      .addCase(deleteProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error
          ? action.error.message
          : "Encountered an error";
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        const productIndex = state?.products?.findIndex(
          (product) => product._id === action.payload
        );
        if (productIndex !== -1) {
          const product = state.products[productIndex];
          product.deleted = true;
        }
      })

      .addCase(restoreProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(restoreProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error
          ? action.error.message
          : "Encountered an error";
      })
      .addCase(restoreProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        const productIndex = state?.products?.findIndex(
          (product) => product._id === action.payload
        );
        if (productIndex !== -1) {
          const product = state.products[productIndex];
          product.deleted = false;
        }
      })

      .addCase(updateProductDataAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductDataAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error
          ? action.error.message
          : "Encountered an error";
      })
      .addCase(updateProductDataAsync.fulfilled, (state, action) => {
        state.loading = false;
        const productIndex = state?.products?.findIndex(
          (product) => product._id === action.payload.productId
        );
        if (productIndex !== -1) {
          state.products.splice(productIndex, 1, action.payload.product)
        }
      })

      .addCase(updateProductThumbnailAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductThumbnailAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error
          ? action.error.message
          : "Encountered an error";
      })
      .addCase(updateProductThumbnailAsync.fulfilled, (state, action) => {
        state.loading = false;
        const productIndex = state?.products?.findIndex(
          (product) => product._id === action.payload.productId
        );
        if (productIndex !== -1) {
          state.products.splice(productIndex, 1, action.payload.product)
        }
      })

      .addCase(updateProductImageAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductImageAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error
          ? action.error.message
          : "Encountered an error";
      })
      .addCase(updateProductImageAsync.fulfilled, (state, action) => {
        state.loading = false;
        const productIndex = state?.products?.findIndex(
          (product) => product._id === action.payload.productId
        );
        if (productIndex !== -1) {
          state.products.splice(productIndex, 1, action.payload.product)
        }
      })

      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })

      .addCase(createCategoryAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategoryAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error
          ? action.error.message
          : "Encountered an error";
      })
      .addCase(createCategoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        state?.categories?.push(action.payload);
      })

      .addCase(deleteCategoryAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategoryAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error
          ? action.error.message
          : "Encountered an error";
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        const categoryIndex = state?.categories?.findIndex(
          (category) => category._id === action.payload
        );
        if (categoryIndex !== -1) {
          const category = state.categories[categoryIndex];
          category.deleted = true;
        }
      })

      .addCase(restoreCategoryAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(restoreCategoryAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error
          ? action.error.message
          : "Encountered an error";
      })
      .addCase(restoreCategoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        const categoryIndex = state?.categories?.findIndex(
          (category) => category._id === action.payload
        );
        if (categoryIndex !== -1) {
          const category = state.categories[categoryIndex];
          category.deleted = false;
        }
      })

      .addCase(fetchBrandsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBrandsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })

      .addCase(createBrandAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBrandAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error
          ? action.error.message
          : "Encountered an error";
      })
      .addCase(createBrandAsync.fulfilled, (state, action) => {
        state.loading = false;
        state?.brands?.push(action.payload);
      })

      .addCase(deleteBrandAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBrandAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error
          ? action.error.message
          : "Encountered an error";
      })
      .addCase(deleteBrandAsync.fulfilled, (state, action) => {
        state.loading = false;
        const brandIndex = state?.brands?.findIndex(
          (brand) => brand._id === action.payload
        );
        if (brandIndex !== -1) {
          const brand = state.brands[brandIndex];
          brand.deleted = true;
        }
      })

      .addCase(restoreBrandAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(restoreBrandAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error
          ? action.error.message
          : "Encountered an error";
      })
      .addCase(restoreBrandAsync.fulfilled, (state, action) => {
        state.loading = false;
        const brandIndex = state?.brands?.findIndex(
          (brand) => brand._id === action.payload
        );
        if (brandIndex !== -1) {
          const brand = state.brands[brandIndex];
          brand.deleted = false;
        }
      })

      
  },
});

export default productSlice.reducer;
