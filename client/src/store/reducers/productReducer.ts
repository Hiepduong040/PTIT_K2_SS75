import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cart, Product } from "../../interface/index";

const initialState = {
  product: [] as Product[],
  cart: [] as Cart[],
};

export const getProduct: any = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    const response = await axios.get("http://localhost:8080/product");
    return response.data;
  }
);

export const getAllProductsInCart: any = createAsyncThunk(
  "cart/getAllProductsInCart",
  async () => {
    const response = await axios.get("http://localhost:8080/cart");
    return response.data;
  }
);

export const addToCart: any = createAsyncThunk(
  "cart/addToCart",
  async (product: any) => {
    const response = await axios.post("http://localhost:8080/cart", product);
    return response.data;
  }
);

export const updateCart: any = createAsyncThunk(
  "cart/updateCart",
  async (updatedProduct: any) => {
    const response = await axios.put(
      `http://localhost:8080/cart/${updatedProduct.id}`,
      updatedProduct
    );
    return response.data;
  }
);

export const removeFromCart: any = createAsyncThunk(
  "cart/removeFromCart",
  async (productId: number) => {
    const response = await axios.delete(`http://localhost:8080/cart/${productId}`);
    return productId;
  }
);

const reducerProduct = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.fulfilled, (state: any, action) => {
        state.product = action.payload;
      })
      .addCase(getAllProductsInCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
        const addedProduct = action.payload;
        const productId = addedProduct.id;
        const productToUpdate = state.product.find(
          (p: Product) => p.id === productId
        );

        if (productToUpdate) {
          productToUpdate.stock -= addedProduct.quantity;
        }
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const productId = updatedProduct.id;
        const index = state.cart.findIndex((item: Cart) => item.id === productId);

        if (index !== -1) {
          state.cart[index] = updatedProduct;
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const productId = action.payload;
        state.cart = state.cart.filter((item: Cart) => item.id !== productId);
      });
  },
});

export default reducerProduct.reducer;
