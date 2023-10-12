import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPromo } from "./promoAPI";
import { createPromo, updatePromo, updatePromoImage } from "../admin/adminAPI";

const initialState = {
  loading: false,
  item: null,
  error: null,
};

export const fetchPromoAsync = createAsyncThunk("fetchPromo", async () => {
  console.log('fetchPromoAsync')
  try {
    const response = await fetchPromo();
    console.log(response)

    if (response.success) {
      return response.promo;
    }
    throw new Error(response.message);
  } catch (error) {
    console.error(error.message)
    throw new Error(error.message);
  }
});

export const updatePromoImageAsync = createAsyncThunk(
  "updatePromoImage",
  async ({ formData, imageIndex }) => {
    try {
      const response = await updatePromoImage(formData, imageIndex);

      if (response.success) {
        return {promo:response.promo, index:imageIndex};
      }
      throw new Error(response.message);
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const updatePromoAsync = createAsyncThunk(
  "updatePromo",
  async (data) => {
    console.log(data)
    try {
      const response = await updatePromo(data);

      if (response.success) {
        return response.promo
      }
      throw new Error(response.message);
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const createPromoAsync = createAsyncThunk(
  "createPromo",
  async (promoData) => {
    try {
      const response = await createPromo(promoData);

      if (response.success) {
        return response.promo
      }
      throw new Error(response.message);
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const promoSlice = createSlice({
  name: "promo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromoAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPromoAsync.rejected, (state, action) => {
        state.loading = false;
        state.rejected = action.error ? action.error.message : "Error";
      })
      .addCase(fetchPromoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload[0];
      })

      .addCase(updatePromoImageAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePromoImageAsync.rejected, (state, action) => {
        state.loading = false;
        state.rejected = action.error ? action.error.message : "Error";
      })
      .addCase(updatePromoImageAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.item.images[action.payload.index] = action.payload.promo.images[action.payload.index]
      })

      .addCase(updatePromoAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePromoAsync.rejected, (state, action) => {
        state.loading = false;
        state.rejected = action.error ? action.error.message : "Error";
      })
      .addCase(updatePromoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload
      })

      .addCase(createPromoAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPromoAsync.rejected, (state, action) => {
        state.loading = false;
        state.rejected = action.error ? action.error.message : "Error";
      })
      .addCase(createPromoAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload
      })
  },
});

export default promoSlice.reducer;
