import { initialState, guitarsReducer } from './guitars-reducer';
import {
  createMockGuitars,
  createMockGuitarsCount,
  createMockGuitarsWithoutComments,
  createMockGuitarWithoutComments
} from '../../mocks/guitars';
import { loadGuitars, getGuitarsTotalCount, loadGuitar, loadGuitarsNoComments } from '../action';

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

  it('should set guitars without comments by load guitars data', () => {
    const mockGuitarsWithoutComments = createMockGuitarsWithoutComments();

    expect(guitarsReducer(initialState, loadGuitarsNoComments(mockGuitarsWithoutComments)))
      .toEqual({
        ...initialState,
        guitarsNoComments: mockGuitarsWithoutComments,
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

  it('should set guitar by load guitar data', () => {
    const mockGuitar = createMockGuitarWithoutComments();

    expect(guitarsReducer(initialState, loadGuitar(mockGuitar)))
      .toEqual({
        ...initialState,
        guitar: mockGuitar,
      });
  });

});
