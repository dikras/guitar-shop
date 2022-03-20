export enum APIRoute {
  Guitars = '/guitars?_embed=comments',
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

export const INITIAL_URL_FILTER = '/guitars?_embed=comments&';

export enum FilterQueryParam {
  Acoustic = 'type=acoustic&',
  Electric = 'type=electric&',
  Ukulele = 'type=ukulele&',
  FourString = 'stringCount=4&',
  SixString = 'stringCount=6&',
  SevenString = 'stringCount=7&',
  TwelveString = 'stringCount=12&',
  SortByPrice = '_sort=price&',
  SortByRating = '_sort=rating&',
  SortLowToHigh = '_order=asc&',
  SortHighToLow = '_order=desc&',
  FilterStartPrice = '&price_gte=',
  FilterEndPrice = '&price_lte=',
}

export enum QueryParamName {
  SortingType ='_sort',
  SortingOrder = '_order',
  FilterString = 'stringCount',
  StartPrice = 'price_gte',
  EndPrice = 'price_lte',
  GuitarComment = '_embed=comments',
}

export const InitialPrice = {
  Min: 0,
  Max: 0,
};

export enum SortingType {
  Default = 'Default',
  ByPrice = 'ByPrice',
  ByRating = 'ByRating',
}

export enum SortingOrder {
  Default = 'Default',
  LowToHigh = 'LowToHigh',
  HighToLow = 'HighToLow',
}

export enum GuitarType {
  Default = 'default',
  Initial = 'initial',
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

export enum StringCount {
  Default = 0,
  Initial = 1,
  FourString = 4,
  SixString = 6,
  SevenString = 7,
  TwelveString = 12,
}

export const IMG_URL_BEGIN_INDEX = 4;

export const NUMBER_TO_ROUND = 6;

export enum WarningMessage {
  FetchFail = 'Server is not available',
}
