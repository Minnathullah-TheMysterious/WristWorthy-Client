import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchAllProductsByFilters,
  fetchMyBrands,
  fetchMyCategories,
  fetchMySelectedProduct,
} from "./productAPI";
import {
  createBrand,
  createCategory,
  createProduct,
} from "./../admin/adminAPI";

const initialState = {
  loading: false,
  products: [],
  myProducts: [],
  categories: [],
  myCategories: [],
  brands: [],
  myBrands: [],
  prices: [],
  totalProductsCount: 0,
  totalMyProductsCount: 0,
  selectedProduct: null,
  mySelectedProduct: null,
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

export const fetchMySelectedProductsAsync = createAsyncThunk(
  "products/fetchMySelectedProduct",
  async (productId) => {
    const response = await fetchMySelectedProduct(productId);
    return response;
  }
);

export const fetchMyBrandsAsync = createAsyncThunk(
  "products/fetchMyBrands",
  async () => {
    const response = await fetchMyBrands();
    console.log(response?.brands);
    return response?.brands;
  }
);

export const fetchMyCategoriesAsync = createAsyncThunk(
  "products/fetchMyCategories",
  async () => {
    const response = await fetchMyCategories();
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
        state.myProducts = action.payload.filteredProducts;
        state.totalMyProductsCount = action.payload.totalCount;
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
        state.myProducts = action.payload?.products;
        state.totalMyProductsCount = action.payload?.totalCount;
      })

      .addCase(fetchMyCategoriesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyCategoriesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMyCategoriesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.myCategories = action.payload;
      })

      .addCase(fetchMyBrandsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyBrandsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMyBrandsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.myBrands = action.payload;
      })

      .addCase(fetchMySelectedProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMySelectedProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMySelectedProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.mySelectedProduct = action.payload;
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
        state?.myProducts?.push(action.payload);
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
        state?.myCategories?.push(action.payload);
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
        state?.myBrands?.push(action.payload);
      });
  },
});

export default productSlice.reducer;
