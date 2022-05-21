import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import ModalRemoveCart from './modal-remove-cart';
import {
  createMockGuitars,
  createMockGuitarsWithoutComments,
  createMockGuitarsCount,
  createMockGuitarWithoutComments
} from '../../mocks/guitars';
import {
  createMockSortingType,
  createMockSortingOrder
} from '../../mocks/sort-filter-data';
import { createMockGuitarName } from '../../mocks/search';
import { createMockStartNumber } from '../../mocks/pagination';
import { datatype } from 'faker';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const setIsModalRemoveCart = () => true;
const handleEscButton = (evt: KeyboardEvent) => {
  if(evt.key === 'Escape' || evt.key === 'Esc') {
    document.removeEventListener('keydown', handleEscButton);
    document.body.style.overflow ='auto';
  }
};

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
  CART: {
    guitarsInCart: createMockGuitarsWithoutComments(),
    totalSum: datatype.number(),
    discount: datatype.number(),
  },
});

describe('Component: ModalRemoveCart', () => {
  store.dispatch = jest.fn();
  it('should render correctly', () => {
    const guitar = createMockGuitarWithoutComments();
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalRemoveCart
            guitar={guitar}
            isActive
            handleModalRemoveCartCloseBtn={setIsModalRemoveCart}
            handleEscButton={handleEscButton}
          />
        </Router>
      </Provider>);

    expect(screen.getByTestId('button-remove-cart-item')).toBeInTheDocument();
  });
});
