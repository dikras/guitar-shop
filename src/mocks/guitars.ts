import {datatype, commerce, image, lorem} from 'faker';
import { Guitar, GuitarNoComments, GuitarToCount } from '../types/guitar';
import { createMockComments } from './comments';

const createMockGuitar = (): Guitar => ({
  id: datatype.number(),
  name: commerce.productName(),
  vendorCode: datatype.string(),
  type: lorem.word(),
  description: commerce.productDescription(),
  previewImg: image.imageUrl(),
  stringCount: datatype.number(),
  rating: datatype.number(),
  price: datatype.number(),
  comments: createMockComments(),
});

const createMockGuitarWithoutComments = (): GuitarNoComments => ({
  id: datatype.number(),
  name: commerce.productName(),
  vendorCode: datatype.string(),
  type: lorem.word(),
  description: commerce.productDescription(),
  previewImg: image.imageUrl(),
  stringCount: datatype.number(),
  rating: datatype.number(),
  price: datatype.number(),
});

const createMockGuitarToCount = (): GuitarToCount => ({
  uniqID: datatype.string(),
  price: datatype.number(),
  quantity: datatype.number(),
});

const createMockGuitarsCount = (): number => datatype.number(100);

const createMockGuitars = (): Guitar[] => new Array(10).fill(null).map(() => createMockGuitar());
const createMockGuitarsWithoutComments = (): GuitarNoComments[] => new Array(10).fill(null).map(() => createMockGuitarWithoutComments());
const createMockGuitarsToCount = (): GuitarToCount[] => new Array(10).fill(null).map(() => createMockGuitarToCount());

export {
  createMockGuitar,
  createMockGuitars,
  createMockGuitarsWithoutComments,
  createMockGuitarsCount,
  createMockGuitarWithoutComments,
  createMockGuitarsToCount
};
