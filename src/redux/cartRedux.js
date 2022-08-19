import { createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../requestMethods";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    total: 0,
    isFetching: false,
    error: false,
    quantity: 0,
  },

  reducers: {
    //ADD cart
    addCartStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addCartSuccess: (state, action) => {
      state.quantity += 1; //this quantity is no of item
      state.products.push(action.payload); //payload is the new product
      state.total += action.payload.price; //this quantity is cart quantity number
    },
    addCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //  remove from cart
    removeCartStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    removeCartSuccess: (state, action) => {
      state.quantity -= 1; //this quantity is no of item
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload._id),
        1
      );
      state.total -= action.payload.price; //this quantity is cart quantity number
    },
    removeCartFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

// export const { addProduct} = cartSlice.actions;
export const {
  addCartStart,
  addCartSuccess,
  addCartFailure,
  removeCartStart,
  removeCartSuccess,
  removeCartFailure,
} = cartSlice.actions;
export default cartSlice.reducer;
