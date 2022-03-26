import { createMockStartNumber } from '../../mocks/pagination';
import { initialState, paginationReducer } from '../../store/pagination-reducer/pagination-reducer';
import { setStartNumber } from '../action';

describe('Reducer: pagination-reducer', () => {
  const mockActionType = 'UNKNOWN_ACTION';

  it('without additional parameters should return initial state', () => {
    expect(paginationReducer(void 0, {type: mockActionType}))
      .toEqual(initialState);
  });

  it('set start number in pagination', () => {
    const mockStartNumber = createMockStartNumber();

    expect(paginationReducer(initialState, setStartNumber(mockStartNumber)))
      .toEqual({
        ...initialState,
        currentStartNumber: mockStartNumber,
      });
  });

});
