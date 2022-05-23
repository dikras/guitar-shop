import { Comment } from './comment';

export type GuitarNoComments = {
  id: number;
  uniqID?: string;
  name: string;
  vendorCode: string;
  type: string;
  description: string;
  previewImg: string;
  stringCount: number;
  rating: number;
  price: number;
};

export type Guitar = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  description: string;
  previewImg: string;
  stringCount: number;
  rating: number;
  price: number;
  comments: Comment[],
};

export type GuitarToCount = {
  uniqID: string | undefined,
  price: number,
  quantity: number,
};

export type DataToSetGuitarCount = {
  uniqID: string | undefined,
  quantity: number,
}
