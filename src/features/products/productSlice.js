import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchBrands,
  fetchCategories,
  fetchPrices,
  fetchProductsByFilters,
  fetchSelectedProduct
} from "./productAPI";

const initialState = {
  loading: false,
  products: [],
  categories: [],
  brands: [],
  prices: [],
  totalProductsCount: 0,
  selectedProduct: null,
  error: null,
};

export const fetchFilteredProductsAsync = createAsyncThunk(
  "products/fetchFilteredProducts",
  async ({ filter, sort, pagination }) => {
    const data = await fetchProductsByFilters(filter, sort, pagination);
    console.log("Products In The Page:", data);
    return data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const data = await fetchCategories();
    return data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "products/fetchBrands",
  async () => {
    const data = await fetchBrands();
    return data;
  }
);

export const fetchPricesAsync = createAsyncThunk(
  "products/fetchPrices",
  async () => {
    const data = await fetchPrices();
    return data;
  }
);

export const fetchSelectedProductsAsync = createAsyncThunk(
  "products/fetchSelectedProduct",
  async (id) => {
    const product = await fetchSelectedProduct(id);
    return product;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilteredProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFilteredProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data.products;
        state.totalProductsCount = action.payload.data.totalProductsCount;
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
      .addCase(fetchPricesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPricesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPricesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.prices = action.payload;
      })
      .addCase(fetchSelectedProductsAsync.pending, (state) => {
        state.loading = true;
      });
    builder.addCase(fetchSelectedProductsAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchSelectedProductsAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedProduct = action.payload;
    });
  },
});

export default productSlice.reducer;
