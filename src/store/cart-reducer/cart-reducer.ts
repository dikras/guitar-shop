import { createReducer } from '@reduxjs/toolkit';
import { CartProcess } from '../../types/state';
import {
  addGuitarToCart,
  removeGuitarFromCart,
  loadDiscount,
  addGuitarToCount,
  increaseGuitarQuantity,
  decreaseGuitarQuantity,
  setGuitarQuantity
} from '../action';

const initialState: CartProcess = {
  guitarsInCart: [],
  discount: 0,
  guitarsToCount: [],
};

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addGuitarToCart, (state, action) => {
      state.guitarsInCart.push(action.payload);
    })
    .addCase(removeGuitarFromCart, (state, action) => {
      const newGuitarsInCart = [...state.guitarsInCart].filter((guitar) => guitar.uniqID !== action.payload.uniqID);
      state.guitarsInCart = newGuitarsInCart;
      if (state.guitarsInCart.length === 0) {
        state.guitarsInCart = [];
        state.discount = 0;
        state.guitarsToCount = [];
      }
    })
    .addCase(addGuitarToCount, (state, action) => {
      state.guitarsToCount.push(action.payload);
    })
    .addCase(increaseGuitarQuantity, (state, action) => {
      if (state.guitarsToCount.length !== 0) {
        const currentGuitar = state.guitarsToCount.find((guitar) => guitar.uniqID === action.payload);
        const newGuitarsToCount = [...state.guitarsToCount].filter((guitar) => guitar.uniqID !== action.payload);
        state.guitarsToCount = newGuitarsToCount;
        currentGuitar && (currentGuitar.quantity += 1);
        currentGuitar && state.guitarsToCount.push(currentGuitar);
      }
    })
    .addCase(decreaseGuitarQuantity, (state, action) => {
      if (state.guitarsToCount.length !== 0) {
        const currentGuitar = state.guitarsToCount.find((guitar) => guitar.uniqID === action.payload);
        const newGuitarsToCount = [...state.guitarsToCount].filter((guitar) => guitar.uniqID !== action.payload);
        state.guitarsToCount = newGuitarsToCount;
        currentGuitar && (currentGuitar.quantity -= 1);
        currentGuitar && state.guitarsToCount.push(currentGuitar);
      }
    })
    .addCase(setGuitarQuantity, (state, action) => {
      if (state.guitarsToCount.length !== 0) {
        const currentGuitar = state.guitarsToCount.find((guitar) => guitar.uniqID === action.payload?.uniqID);
        const newGuitarsToCount = [...state.guitarsToCount].filter((guitar) => guitar.uniqID !== action.payload?.uniqID);
        state.guitarsToCount = newGuitarsToCount;
        (action.payload && currentGuitar) && (currentGuitar.quantity = action.payload?.quantity);
        currentGuitar && state.guitarsToCount.push(currentGuitar);
      }
    })
    .addCase(loadDiscount, (state, action) => {
      state.discount = action.payload;
    });
});

export {initialState, cartReducer};
