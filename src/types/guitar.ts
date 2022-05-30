import { Comment } from './comment';

export type GuitarNoComments = {
  id: number;
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
  id: number,
  price: number,
  quantity: number,
};

export type DataToSetGuitarCount = {
  id: number,
  quantity: number,
}
