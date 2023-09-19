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
      });
  },
});

export default productSlice.reducer;
