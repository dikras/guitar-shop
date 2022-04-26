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
import ModalReview from './modal-review';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const setIsModalReviewOpened = () => true;
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

describe('Component: ModalReview', () => {
  store.dispatch = jest.fn();
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalReview
            handleModalReviewCloseBtn={setIsModalReviewOpened}
            handleModalSuccessCloseBtn={setIsModalSuccessOpened}
          />
        </Router>
      </Provider>);

    expect(screen.getByTestId('review-modal')).toBeInTheDocument();
    expect(screen.getByTestId('input-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-pros')).toBeInTheDocument();
    expect(screen.getByTestId('button-send-review')).toBeInTheDocument();
  });

  it('should input name in form-input', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalReview
            handleModalReviewCloseBtn={setIsModalReviewOpened}
            handleModalSuccessCloseBtn={setIsModalSuccessOpened}
          />
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('input-name'), 'Dmitry');
    expect(screen.getByTestId('input-name')).toHaveValue('Dmitry');
  });
});
