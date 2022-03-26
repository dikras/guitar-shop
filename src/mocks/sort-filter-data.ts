import { datatype } from 'faker';
import { GuitarType, SortingType, SortingOrder, FilterQueryParam } from '../const';

const createMockGuitarType = (): GuitarType => GuitarType.Acoustic;
const createMockStringCount = (): number => datatype.number();
const createMockSortingType = (): SortingType => SortingType.ByPrice;
const createMockSortingOrder = (): SortingOrder => SortingOrder.HighToLow;
const createMockUrlFilter = (): FilterQueryParam => FilterQueryParam.SortByPrice;
const createMockStartPrice = (): number => datatype.number();
const createMockEndPrice = (): number => datatype.number();

export {
  createMockGuitarType,
  createMockStringCount,
  createMockSortingType,
  createMockSortingOrder,
  createMockUrlFilter,
  createMockStartPrice,
  createMockEndPrice
};
