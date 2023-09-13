import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchBrands,
  fetchCategories,
  fetchMyBrands,
  fetchMyCategories,
  fetchPrices,
  fetchProductsByFilters,
  fetchSelectedProduct,
} from "./productAPI";
import { createBrand, createCategory, createProduct } from "./../admin/adminAPI";

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

export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    console.log(response)
    return response;
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
      })
      .addCase(fetchSelectedProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSelectedProductsAsync.fulfilled, (state, action) => {
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
