export enum APIRoute {
  Guitars = '/guitars',
  Guitar = '/guitars/:id',
  Comments = '/comments',
  Coupon = '/coupons',
  Order = '/orders'
}

export enum AppRoute {
  Main = '/',
  Guitar = '/guitars',
}

export const GuitarImageSize = {
  Card: {
    Height: '190',
    Width: '75',
  },
};

export const INITIAL_URL_FILTER = '/guitars?';

export enum FilterTypeQueryParam {
  Acoustic = 'type=acoustic&',
  Electric = 'type=electric&',
  Ukulele = 'type=ukulele&',
}

export enum QueryParamName {
  SortingType ='_sort',
  SortingOrder = '_order',
  FilterString = 'stringCount',
  StartPrice = 'price_gte',
  EndPrice = 'price_lte'
}

export enum SortingType {
  Default = 'default',
  ByPrice = 'price',
  ByRating = 'rating',
}

export enum SortingOrder {
  Default = 'default',
  LowToHigh = 'asc',
  HighToLow = 'desc',
}

export enum GuitarType {
  Default = 'default',
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

export enum StringCount {
  Default = 0,
  Initial = 1,
  FourStrings = 4,
  SixStrings = 6,
  SevenStrings = 7,
  TwelveStrings = 12,
}

export const IMG_URL_BEGIN_INDEX = 4;

export const NUMBER_TO_ROUND = 6;

export enum WarningMessage {
  FetchFail = 'Server is not available',
}

/* eslint-disable no-console */
