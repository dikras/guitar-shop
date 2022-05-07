import { createReducer } from '@reduxjs/toolkit';
import { CartProcess } from '../../types/state';
import { addGuitarToCart, removeGuitarFromCart } from '../action';

const initialState: CartProcess = {
  guitarsInCart: [],
  totalSum: 0,
  isGuitarAddedToCart: false,
  isGuitarRemovedFromCart: false,
};

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addGuitarToCart, (state, action) => {
      state.guitarsInCart.push(action.payload);
      state.isGuitarAddedToCart = true;
      state.totalSum += action.payload.price;
    })
    .addCase(removeGuitarFromCart, (state, action) => {
      const newGuitarsInCart = [...state.guitarsInCart].filter((guitar) => guitar.name !== action.payload.name);
      state.guitarsInCart = newGuitarsInCart;
      state.isGuitarRemovedFromCart = true;
      state.totalSum -= action.payload.price;
    });
});

export {initialState, cartReducer};
