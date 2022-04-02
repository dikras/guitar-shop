export enum APIRoute {
  GuitarsNoComments = '/guitars',
  Guitars = '/guitars?_embed=comments&',
  Guitar = '/guitars/:id',
  Comments = '/comments',
  Coupon = '/coupons',
  Order = '/orders'
}

export enum AppRoute {
  Main = '/',
  Catalog = '/page_:id',
  Guitar = '/guitars',
}

export const ImageSize = {
  GuitarCard: {
    Height: '190',
    Width: '75',
  },
  RatingStar: {
    Height: '11',
    Width: '12',
  },
};

export enum FilterQueryParam {
  Acoustic = '&type=acoustic&',
  Electric = '&type=electric&',
  Ukulele = '&type=ukulele&',
  FourString = '&stringCount=4&',
  SixString = '&stringCount=6&',
  SevenString = '&stringCount=7&',
  TwelveString = '&stringCount=12&',
  SortByPrice = '&_sort=price&',
  SortByRating = '&_sort=rating&',
  SortLowToHigh = '&_order=asc&',
  SortHighToLow = '&_order=desc&',
  FilterStartPrice = '&price_gte=',
  FilterEndPrice = '&price_lte=',
}

export enum QueryParamName {
  SortingType ='_sort',
  SortingOrder = '_order',
  FilterString = 'stringCount',
  StartPrice = 'price_gte',
  EndPrice = 'price_lte',
  NameLike = 'name_like'
}

export const InitialPrice = {
  Min: 0,
  Max: 0,
};

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

export enum PaginationNumber {
  Limit = 9,
  InitialStart = 0,
}

export const ENTER_KEY = 'Enter';

export const FULL_STARS_COUNT = 4;
