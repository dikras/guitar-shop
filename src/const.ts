export enum APIRoute {
  GuitarsNoComments = '/guitars',
  Guitars = '/guitars?_embed=comments',
  Guitar = '/guitars/:id',
  Comments = '/comments',
  Coupon = '/coupons',
  Order = '/orders'
}

export enum AppRoute {
  Main = '/',
  Catalog = '/page_:id',
  Guitar = '/guitars',
  GuitarCard ='/:id'
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
  RatingStarProductCard: {
    Height: '14',
    Width: '14',
  },
  RatingStarReview: {
    Height: '16',
    Width: '16',
  },
};

export enum QueryParam {
  Type = 'type',
  StringCount = 'stringCount',
  SortingType ='_sort',
  SortingOrder = '_order',
  StartPrice = 'price_gte',
  EndPrice = 'price_lte',
  NameLike = 'name_like',
  PaginationStart = '_start',
  PaginationLimit = '_limit',
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

export enum StringNumber {
  FourString = '4',
  SixString = '6',
  SevenString = '7',
  TwelveString = '12',
}

export const IMG_URL_BEGIN_INDEX = 4;

export const NUMBER_TO_ROUND = 6;

export enum WarningMessage {
  FetchFail = 'Server is not available',
}

export enum PaginationNumber {
  Limit = 9,
  InitialStart = 0,
  FirstPage = 1,
}

export const ENTER_KEY = 'Enter';

export const FULL_STARS_COUNT = 4;

export const REVIEWS_PER_STEP = 3;

export const RATING_STARS = [
  {
    description: 'Отлично',
    value: 5,
    starId: 'star-5',
  },
  {
    description: 'Хорошо',
    value: 4,
    starId: 'star-4',
  },
  {
    description: 'Нормально',
    value: 3,
    starId: 'star-3',
  },
  {
    description: 'Плохо',
    value: 2,
    starId: 'star-2',
  },
  {
    description: 'Ужасно',
    value: 1,
    starId: 'star-1',
  },
];

export const INITIAL_TAB_HEIGHT = 47;

export enum GuitarTypeRus {
  Electric = 'Электрогитара',
  Acoustic = 'Акустическая гитара',
  Ukulele = 'Укулеле',
}

export const UNDEFINED_GUITAR_TYPE = 'Гитара';
