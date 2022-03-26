import {
  createMockGuitarType,
  createMockStringCount,
  createMockSortingType,
  createMockSortingOrder,
  createMockUrlFilter,
  createMockStartPrice,
  createMockEndPrice
} from '../../mocks/sort-filter-data';
import { initialState, appReducer } from '../../store/app-reducer/app-reducer';
import {
  changeGuitarType,
  changeStringCount,
  changeSortingType,
  changeSortingOrder,
  setStartPrice,
  setEndPrice,
  addFilterAction,
  removeFilterAction
} from '../action';
import { APIRoute } from '../../const';

describe('Reducer: app-reducer', () => {
  const mockActionType = 'UNKNOWN_ACTION';

  it('without additional parameters should return initial state', () => {
    expect(appReducer(void 0, {type: mockActionType}))
      .toEqual(initialState);
  });

  it('should change guitar type', () => {
    const mockGuitarType = createMockGuitarType();

    expect(appReducer(initialState, changeGuitarType(mockGuitarType)))
      .toEqual({
        ...initialState,
        currentGuitarType: mockGuitarType,
      });
  });

  it('should change strings count', () => {
    const mockStringCount = createMockStringCount();

    expect(appReducer(initialState, changeStringCount(mockStringCount)))
      .toEqual({
        ...initialState,
        currentStringCount: mockStringCount,
      });
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

  it('should add query-parameters to url', () => {
    const mockUrlFilter = createMockUrlFilter();

    expect(appReducer(initialState, addFilterAction(mockUrlFilter)))
      .toEqual({
        ...initialState,
        currentUrlFilter: `${APIRoute.Guitars}${mockUrlFilter}`,
      });
  });

  it('should remove query-parameters from url', () => {
    const mockUrlFilter = createMockUrlFilter();

    expect(appReducer(initialState, removeFilterAction(mockUrlFilter)))
      .toEqual({
        ...initialState,
        currentUrlFilter: APIRoute.Guitars,
      });
  });

  it('should set start price', () => {
    const mockStartPrice = createMockStartPrice();

    expect(appReducer(initialState, setStartPrice(mockStartPrice)))
      .toEqual({
        ...initialState,
        currentStartPrice: mockStartPrice,
      });
  });

  it('should set end price', () => {
    const mockEndPrice = createMockEndPrice();

    expect(appReducer(initialState, setEndPrice(mockEndPrice)))
      .toEqual({
        ...initialState,
        currentEndPrice: mockEndPrice,
      });
  });

});
