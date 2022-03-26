import { initialState, guitarsReducer } from './guitars-reducer';
import { createMockGuitars, createMockGuitarsCount } from '../../mocks/guitars';
import { loadGuitars, getGuitarsTotalCount } from '../action';

describe('Reducer: guitars', () => {
  const mockActionType = 'UNKNOWN_ACTION';

  it('without additional parameters should return initial state', () => {
    expect(guitarsReducer(void 0, {type: mockActionType}))
      .toEqual(initialState);
  });

  it('should set guitars by load guitars data', () => {
    const mockGuitars = createMockGuitars();

    expect(guitarsReducer(initialState, loadGuitars(mockGuitars)))
      .toEqual({
        ...initialState,
        guitars: mockGuitars,
      });
  });

  it('should set guitars count by load response header \'x-total-count\'', () => {
    const mockGuitarsCount = createMockGuitarsCount();

    expect(guitarsReducer(initialState, getGuitarsTotalCount(mockGuitarsCount)))
      .toEqual({
        ...initialState,
        guitarsTotalCount: mockGuitarsCount,
      });
  });

});
