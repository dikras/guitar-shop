import { commerce } from 'faker';

const createMockGuitarName = (): string => commerce.productName();

export { createMockGuitarName };
