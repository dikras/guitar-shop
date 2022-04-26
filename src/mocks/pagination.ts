import { datatype } from 'faker';

const createMockStartNumber = (): number => datatype.number();
const createMockPageNumber = (): number => datatype.number();

export {createMockStartNumber, createMockPageNumber};
