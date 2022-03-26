import {datatype, commerce, image, lorem} from 'faker';
import { Guitar } from '../types/guitar';
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

const createMockGuitarsCount = (): number => datatype.number(100);

const createMockGuitars = (): Guitar[] => new Array(10).fill(null).map(() => createMockGuitar());

export {createMockGuitar, createMockGuitars, createMockGuitarsCount};
