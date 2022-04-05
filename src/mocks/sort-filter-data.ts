import { SortingType, SortingOrder } from '../const';

const createMockSortingType = (): SortingType => SortingType.ByPrice;
const createMockSortingOrder = (): SortingOrder => SortingOrder.HighToLow;

export { createMockSortingType, createMockSortingOrder };
