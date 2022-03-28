import { createMockGuitarName } from '../../mocks/search';
import { initialState, searchGuitarNameReducer } from '../search-reducer/search-reducer';
import { setGuitarName } from '../action';

describe('Reducer: search-reducer', () => {
  const mockActionType = 'UNKNOWN_ACTION';

  it('without additional parameters should return initial state', () => {
    expect(searchGuitarNameReducer(void 0, {type: mockActionType}))
      .toEqual(initialState);
  });

  it('set guitar name to search and \'true\' if search was done', () => {
    const mockGuitarName = createMockGuitarName();
    const mockIsSearchDone = true;

    expect(searchGuitarNameReducer(initialState, setGuitarName(mockGuitarName)))
      .toEqual({
        ...initialState,
        currentGuitarName: mockGuitarName,
        isSearchDone: mockIsSearchDone,
      });
  });

});
