import { createReducer } from '@reduxjs/toolkit';
import { CartProcess } from '../../types/state';
import {
  addGuitarToCart,
  removeGuitarFromCart,
  loadDiscount,
  addGuitarToCount,
  increaseGuitarQuantity,
  decreaseGuitarQuantity,
  setGuitarQuantity,
  setCouponValue
} from '../action';

const initialState: CartProcess = {
  guitarsInCart: [],
  discount: 0,
  guitarsToCount: [],
  coupon: '',
};

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addGuitarToCart, (state, action) => {
      state.guitarsInCart.push(action.payload);
    })
    .addCase(removeGuitarFromCart, (state, action) => {
      const newGuitarsInCart = [...state.guitarsInCart].filter((guitar) => guitar.id !== action.payload.id);
      state.guitarsInCart = newGuitarsInCart;
      const newGuitarsToCount = [...state.guitarsToCount].filter((guitar) => guitar.id !== action.payload.id);
      state.guitarsToCount = newGuitarsToCount;
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
        const currentGuitar = state.guitarsToCount.find((guitar) => guitar.id === action.payload);
        const newGuitarsToCount = [...state.guitarsToCount].filter((guitar) => guitar.id !== action.payload);
        state.guitarsToCount = newGuitarsToCount;
        currentGuitar && (currentGuitar.quantity += 1);
        currentGuitar && state.guitarsToCount.push(currentGuitar);
      }
    })
    .addCase(decreaseGuitarQuantity, (state, action) => {
      if (state.guitarsToCount.length !== 0) {
        const currentGuitar = state.guitarsToCount.find((guitar) => guitar.id === action.payload);
        const newGuitarsToCount = [...state.guitarsToCount].filter((guitar) => guitar.id !== action.payload);
        state.guitarsToCount = newGuitarsToCount;
        currentGuitar && (currentGuitar.quantity -= 1);
        currentGuitar && state.guitarsToCount.push(currentGuitar);
      }
    })
    .addCase(setGuitarQuantity, (state, action) => {
      if (state.guitarsToCount.length !== 0) {
        const currentGuitar = state.guitarsToCount.find((guitar) => guitar.id === action.payload?.id);
        const newGuitarsToCount = [...state.guitarsToCount].filter((guitar) => guitar.id !== action.payload?.id);
        state.guitarsToCount = newGuitarsToCount;
        (action.payload && currentGuitar) && (currentGuitar.quantity = action.payload?.quantity);
        currentGuitar && state.guitarsToCount.push(currentGuitar);
      }
    })
    .addCase(loadDiscount, (state, action) => {
      state.discount = action.payload;
    })
    .addCase(setCouponValue, (state, action) => {
      state.coupon = action.payload;
    });
});

export {initialState, cartReducer};
