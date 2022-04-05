import {
  createMockSortingType,
  createMockSortingOrder
} from '../../mocks/sort-filter-data';
import { initialState, appReducer } from '../../store/app-reducer/app-reducer';
import {
  changeSortingType,
  changeSortingOrder
} from '../action';

describe('Reducer: app-reducer', () => {
  const mockActionType = 'UNKNOWN_ACTION';

  it('without additional parameters should return initial state', () => {
    expect(appReducer(void 0, {type: mockActionType}))
      .toEqual(initialState);
  });

  it('should change sorting type', () => {
    const mockSortingType = createMockSortingType();

    expect(appReducer(initialState, changeSortingType(mockSortingType)))
      .toEqual({
        ...initialState,
        currentSortingType: mockSortingType,
      });
  });

  it('should change sorting order', () => {
    const mockSortingOrder = createMockSortingOrder();

    expect(appReducer(initialState, changeSortingOrder(mockSortingOrder)))
      .toEqual({
        ...initialState,
        currentSortingOrder: mockSortingOrder,
      });
  });

});
