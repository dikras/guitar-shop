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

export enum SortingType {
  Default = 'Default',
  ByPrice = 'ByPrice',
  ByPopularity = 'ByPopularity',
}

export enum SortingRanking {
  Default = 'Default',
  LowToHigh = 'LowToHigh',
  HighToLow = 'HighToLow',
}

export const IMG_URL_BEGIN_INDEX = 4;

export const NUMBER_TO_ROUND = 6;

export enum WarningMessage {
  FetchFail = 'Server is not available',
}

/* eslint-disable no-console */
