import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import Filter from './filter';
import { createMockGuitars, createMockGuitarsWithoutComments, createMockGuitarsCount } from '../../mocks/guitars';
import {
  createMockSortingType,
  createMockSortingOrder
} from '../../mocks/sort-filter-data';
import { createMockGuitarName } from '../../mocks/search';
import { createMockStartNumber } from '../../mocks/pagination';

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

describe('Component: Filter', () => {
  store.dispatch = jest.fn();
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Filter />
        </Router>
      </Provider>);

    expect(screen.getByTestId('checkbox-electric')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-12-strings')).toBeInTheDocument();
  });
});
