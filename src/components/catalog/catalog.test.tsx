import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import Catalog from './catalog';
import {
  createMockGuitars,
  createMockGuitarsWithoutComments,
  createMockGuitarsCount,
  createMockGuitar,
  createMockGuitarsToCount
} from '../../mocks/guitars';
import {
  createMockSortingType,
  createMockSortingOrder
} from '../../mocks/sort-filter-data';
import { createMockGuitarName } from '../../mocks/search';
import { createMockStartNumber } from '../../mocks/pagination';
import { createMockComments } from '../../mocks/comments';
import { datatype } from 'faker';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  DATA: {
    guitarsNoComments: createMockGuitarsWithoutComments(),
    guitars: createMockGuitars(),
    guitarsTotalCount: createMockGuitarsCount(),
    guitar: createMockGuitar(),
  },
  APP: {
    currentSortingType: createMockSortingType(),
    currentSortingOrder: createMockSortingOrder(),
  },
  PAGINATION: {
    currentStartNumber: createMockStartNumber(),
    currentPage: createMockStartNumber(),
  },
  SEARCH: {
    currentGuitarName: createMockGuitarName(),
    guitarsByName: createMockGuitarsWithoutComments(),
  },
  COMMENTS: {
    comments: createMockComments(),
  },
  CART: {
    guitarsInCart: createMockGuitarsWithoutComments(),
    discount: datatype.number(),
    guitarsToCount: createMockGuitarsToCount(),
  },
});

describe('Component: Catalog', () => {
  store.dispatch = jest.fn();
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Catalog />
        </Router>
      </Provider>);

    expect(screen.getByTestId('catalog-title')).toBeInTheDocument();
  });
});
