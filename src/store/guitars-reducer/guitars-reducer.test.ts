import { initialState, guitarsReducer } from './guitars-reducer';
import { createMockGuitars, createMockGuitarsWithoutComments, createMockGuitarsCount } from '../../mocks/guitars';
import { loadGuitars, loadGuitarsNoComments, loadGuitarsSearch, getGuitarsTotalCount } from '../action';

describe('Reducer: guitars', () => {
  const mockActionType = 'UNKNOWN_ACTION';

  it('without additional parameters should return initial state', () => {
    expect(guitarsReducer(void 0, {type: mockActionType}))
      .toEqual(initialState);
  });

  it('should set guitars with comments by load guitars data', () => {
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

  it('should set guitars searched by name', () => {
    const mockGuitarsWithoutComments = createMockGuitarsWithoutComments();

    expect(guitarsReducer(initialState, loadGuitarsSearch(mockGuitarsWithoutComments)))
      .toEqual({
        ...initialState,
        guitarsSearch: mockGuitarsWithoutComments,
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
