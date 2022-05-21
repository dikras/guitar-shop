/* eslint-disable no-console */
import { initialState, cartReducer } from './cart-reducer';
import { createMockGuitarWithoutComments } from '../../mocks/guitars';
import { addGuitarToCart, loadDiscount, addSumToCart } from '../action';
import { datatype } from 'faker';
import { GuitarNoComments } from '../../types/guitar';

describe('Reducer: cart', () => {
  const mockActionType = 'UNKNOWN_ACTION';

  it('without additional parameters should return initial state', () => {
    expect(cartReducer(void 0, {type: mockActionType}))
      .toEqual(initialState);
  });

  it('should add guitar and it\'s price to cart', () => {
    const mockGuitar = createMockGuitarWithoutComments();
    const guitarsInCart: GuitarNoComments[] = [];
    guitarsInCart.push(mockGuitar);
    const totalSum = 0;

    expect(cartReducer(initialState, addGuitarToCart(mockGuitar)))
      .toEqual({
        ...initialState,
        guitarsInCart: guitarsInCart,
        totalSum: totalSum + mockGuitar.price,
      });
  });

  it('should add guitar price to total sum', () => {
    const mockTotalSum = datatype.number();

    expect(cartReducer(initialState, addSumToCart(mockTotalSum)))
      .toEqual({
        ...initialState,
        totalSum: mockTotalSum,
      });
  });

  it('should set discount by load coupon data', () => {
    const mockDiscount = datatype.number();

    expect(cartReducer(initialState, loadDiscount(mockDiscount)))
      .toEqual({
        ...initialState,
        discount: mockDiscount,
      });
  });
});
