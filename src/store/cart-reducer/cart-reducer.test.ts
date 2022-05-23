import { initialState, cartReducer } from './cart-reducer';
import { createMockGuitarWithoutComments } from '../../mocks/guitars';
import { addGuitarToCart, loadDiscount } from '../action';
import { datatype } from 'faker';
import { GuitarNoComments } from '../../types/guitar';

describe('Reducer: cart', () => {
  const mockActionType = 'UNKNOWN_ACTION';

  it('without additional parameters should return initial state', () => {
    expect(cartReducer(void 0, {type: mockActionType}))
      .toEqual(initialState);
  });

  it('should add guitar to cart', () => {
    const mockGuitar = createMockGuitarWithoutComments();
    const guitarsInCart: GuitarNoComments[] = [];
    guitarsInCart.push(mockGuitar);

    expect(cartReducer(initialState, addGuitarToCart(mockGuitar)))
      .toEqual({
        ...initialState,
        guitarsInCart: guitarsInCart,
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
