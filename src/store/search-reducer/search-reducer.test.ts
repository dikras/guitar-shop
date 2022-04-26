import { createMockGuitarName } from '../../mocks/search';
import { createMockGuitarsWithoutComments } from '../../mocks/guitars';
import { initialState, searchGuitarNameReducer } from '../search-reducer/search-reducer';
import { setGuitarName, loadGuitarsByName } from '../action';

describe('Reducer: search-reducer', () => {
  const mockActionType = 'UNKNOWN_ACTION';

  it('without additional parameters should return initial state', () => {
    expect(searchGuitarNameReducer(void 0, {type: mockActionType}))
      .toEqual(initialState);
  });

  it('set current guitar name', () => {
    const mockCurrentGuitarName = createMockGuitarName();

    expect(searchGuitarNameReducer(initialState, setGuitarName(mockCurrentGuitarName)))
      .toEqual({
        ...initialState,
        currentGuitarName: mockCurrentGuitarName,
      });
  });

  it('load guitars by name', () => {
    const mockGuitars = createMockGuitarsWithoutComments();

    expect(searchGuitarNameReducer(initialState, loadGuitarsByName(mockGuitars)))
      .toEqual({
        ...initialState,
        guitarsByName: mockGuitars,
      });
  });

});
