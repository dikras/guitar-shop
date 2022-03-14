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

export enum GuitarType {
  Default = 'default',
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

export enum StringCount {
  Default = 0,
  FourStrings = 4,
  SixStrings = 6,
  SevenStrings = 7,
  TwelveStrings = 12,
}

export const PriceRange = {
  Min: 1000,
  Max: 30000,
};

export const IMG_URL_BEGIN_INDEX = 4;

export const NUMBER_TO_ROUND = 6;

export enum WarningMessage {
  FetchFail = 'Server is not available',
}

/* eslint-disable no-console */
