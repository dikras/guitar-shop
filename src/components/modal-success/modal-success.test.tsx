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
import ModalSuccess from './modal-success';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const setIsModalSuccessOpened = () => true;

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

describe('Component: ModalSuccess', () => {
  store.dispatch = jest.fn();
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalSuccess handleModalSuccessCloseBtn={setIsModalSuccessOpened} />
        </Router>
      </Provider>);

    expect(screen.getByTestId('button-to-product')).toBeInTheDocument();
    expect(screen.getByTestId('button-success-close')).toBeInTheDocument();
  });
});
