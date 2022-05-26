import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import {
  createMockGuitars,
  createMockGuitarsWithoutComments,
  createMockGuitarsCount,
  createMockGuitar
} from '../../mocks/guitars';
import {
  createMockSortingType,
  createMockSortingOrder
} from '../../mocks/sort-filter-data';
import { createMockGuitarName } from '../../mocks/search';
import { createMockStartNumber } from '../../mocks/pagination';
import { createMockComments } from '../../mocks/comments';
import ProductContainer from './product-container';

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
});

describe('Component: ProductContainer', () => {
  store.dispatch = jest.fn();
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductContainer />
        </Router>
      </Provider>);

    expect(screen.getByTestId('tab-characteristics')).toBeInTheDocument();
    expect(screen.getByTestId('rating-stars')).toBeInTheDocument();
  });
});
