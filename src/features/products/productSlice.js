import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProductsByFilters,
  fetchBrands,
  fetchCategories,
  fetchRelatedProducts,
  fetchSelectedProduct,
  updateProductStock,
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
  updateBrandImage,
  updateBrandName,
  updateCategoryImage,
  updateCategoryName,
  updateProductData,
  updateProductImage,
  updateProductThumbnail,
} from "./../admin/adminAPI";

const initialState = {
  loading: false,
  totalProductsCount: 0,
  totalNonDeletedProductsCount: 0,
  products: [],
  nonDeletedProducts: [],
  selectedProduct: null,
  relatedProducts: [],
  categories: [],
  brands: [],
  error: null,
};

export const fetchAllProductsByFiltersAsync = createAsyncThunk(
  "products/fetchAllProductsByFilters",
  async ({ filter, sort, pagination }) => {
    try {
      const response = await fetchAllProductsByFilters(
        filter,
        sort,
        pagination
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const fetchSelectedProductAsync = createAsyncThunk(
  "products/fetchSelectedProduct",
  async (productId) => {
    const response = await fetchSelectedProduct(productId);
    return response;
  }
);

export const fetchRelatedProductsAsync = createAsyncThunk(
  "products/fetchRelatedProducts",
  async ({ productCategory, productId }) => {
    try {
      const response = await fetchRelatedProducts(productCategory, productId);
      if (response.success) {
        return response.relatedProducts;
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
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
  async ({ productId, updatedProduct }) => {
    try {
      const response = await updateProductData(productId, updatedProduct);
      if (response.success) {
        return { product: response.product, productId };
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
  async ({ productId, formData }) => {
    try {
      const response = await updateProductThumbnail(productId, formData);
      if (response.success) {
        return { product: response.product, productId };
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
  async ({ productId, formData, imageIndex }) => {
    try {
      const response = await updateProductImage(
        productId,
        formData,
        imageIndex
      );
      if (response.success) {
        return { product: response.product, productId };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }
);

export const updateProductStockSlice = createAsyncThunk(
  "products/updateProductStock",
  async ({ productId, productQuantity }) => {
    try {
      const response = await updateProductStock(productId, productQuantity);
      if (response.success) {
        return { product: response.product, productId };
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
    return response?.brands;
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

export const updateBrandNameAsync = createAsyncThunk(
  "products/updateBrandName",
  async ({ brandId, brand_name }) => {
    try {
      const response = await updateBrandName(brandId, brand_name);
      if (response) {
        return { brand: response.brand, brandId };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }
);

export const updateBrandImageAsync = createAsyncThunk(
  "products/updateBrandImage",
  async ({ brandId, formData }) => {
    try {
      const response = await updateBrandImage(brandId, formData);
      if (response) {
        return { brand: response.brand, brandId };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error?.message);
    }
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

export const updateCategoryNameAsync = createAsyncThunk(
  "products/updateCategoryName",
  async ({ categoryId, category_name }) => {
    try {
      const response = await updateCategoryName(categoryId, category_name);
      if (response) {
        return { category: response.category, categoryId };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      throw new Error(error?.message);
    }
  }
);

export const updateCategoryImageAsync = createAsyncThunk(
  "products/updateCategoryImage",
  async ({ categoryId, formData }) => {
    try {
      const response = await updateCategoryImage(categoryId, formData);
      if (response) {
        return { category: response.category, categoryId };
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
        state.nonDeletedProducts = action.payload.filteredNonDeletedProducts;
        state.totalProductsCount = action.payload.totalProductsCount;
        state.totalNonDeletedProductsCount =
          action.payload.totalNonDeletedProductsCount;
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

      .addCase(fetchRelatedProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRelatedProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error ? action.error.message : "Error";
      })
      .addCase(fetchRelatedProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedProducts = action.payload;
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
          state.products.splice(productIndex, 1, action.payload.product);
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
          state.products.splice(productIndex, 1, action.payload.product);
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
          state.products.splice(productIndex, 1, action.payload.product);
        }
      })

      .addCase(updateProductStockSlice.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductStockSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error
          ? action.error.message
          : "Encountered an error";
      })
      .addCase(updateProductStockSlice.fulfilled, (state, action) => {
        state.loading = false;
        const productIndex = state?.products?.findIndex(
          (product) => product._id === action.payload.productId
        );
        if (productIndex !== -1) {
          state.products.splice(productIndex, 1, action.payload.product);
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

      .addCase(updateCategoryNameAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategoryNameAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error
          ? action.error.message
          : "Encountered an error";
      })
      .addCase(updateCategoryNameAsync.fulfilled, (state, action) => {
        state.loading = false;
        const categoryIndex = state?.categories?.findIndex(
          (category) => category._id === action.payload.categoryId
        );
        if (categoryIndex !== -1) {
          state?.categories?.splice(categoryIndex, 1, action.payload.category);
        }
      })

      .addCase(updateCategoryImageAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategoryImageAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error
          ? action.error.message
          : "Encountered an error";
      })
      .addCase(updateCategoryImageAsync.fulfilled, (state, action) => {
        state.loading = false;
        const categoryIndex = state?.categories?.findIndex(
          (category) => category._id === action.payload.categoryId
        );
        if (categoryIndex !== -1) {
          state?.categories?.splice(categoryIndex, 1, action.payload.category);
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

      .addCase(updateBrandNameAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBrandNameAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error
          ? action.error.message
          : "Encountered an error";
      })
      .addCase(updateBrandNameAsync.fulfilled, (state, action) => {
        state.loading = false;
        const brandIndex = state?.brands?.findIndex(
          (brand) => brand._id === action.payload.brandId
        );
        if (brandIndex !== -1) {
          state?.brands?.splice(brandIndex, 1, action.payload.brand);
        }
      })

      .addCase(updateBrandImageAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBrandImageAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error
          ? action.error.message
          : "Encountered an error";
      })
      .addCase(updateBrandImageAsync.fulfilled, (state, action) => {
        state.loading = false;
        const brandIndex = state?.brands?.findIndex(
          (brand) => brand._id === action.payload.brandId
        );
        if (brandIndex !== -1) {
          state?.brands?.splice(brandIndex, 1, action.payload.brand);
        }
      });
  },
});

export default productSlice.reducer;
