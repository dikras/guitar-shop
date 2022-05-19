import { createReducer } from '@reduxjs/toolkit';
import { CartProcess } from '../../types/state';
import {
  addGuitarToCart,
  removeGuitarFromCart,
  loadDiscount,
  addSumToCart
} from '../action';

const initialState: CartProcess = {
  guitarsInCart: [],
  totalSum: 0,
  discount: 0,
};

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addGuitarToCart, (state, action) => {
      state.guitarsInCart.push(action.payload);
      state.totalSum += action.payload.price;
    })
    .addCase(removeGuitarFromCart, (state, action) => {
      const newGuitarsInCart = [...state.guitarsInCart].filter((guitar) => guitar.uniqID !== action.payload.uniqID);
      state.guitarsInCart = newGuitarsInCart;
      state.totalSum -= action.payload.price;
    })
    .addCase(addSumToCart, (state, action) => {
      state.totalSum += action.payload;
    })
    .addCase(loadDiscount, (state, action) => {
      state.discount = action.payload;
    });
});

export {initialState, cartReducer};
