import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import Sort from './sort';
import { createMockGuitars, createMockGuitarsWithoutComments, createMockGuitarsCount } from '../../mocks/guitars';
import { createMockStartNumber } from '../../mocks/pagination';
import { createMockSortingType, createMockSortingOrder } from '../../mocks/sort-filter-data';
import { createMockGuitarName } from '../../mocks/search';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  DATA: {
    guitarsNoComments: createMockGuitarsWithoutComments(),
    guitars: createMockGuitars(),
    guitarsTotalCount: createMockGuitarsCount(),
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
});

describe('Component: Sort', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Sort />
        </Router>
      </Provider>);

    expect(screen.getByTestId('sort-button-asc')).toBeInTheDocument();
    expect(screen.getByTestId('sort-button-rating')).toBeInTheDocument();
    expect(screen.getByTestId('sort-button-price')).toBeInTheDocument();
    expect(screen.getByTestId('sort-button-desc')).toBeInTheDocument();
  });
});
