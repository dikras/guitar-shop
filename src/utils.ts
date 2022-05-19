import {
  GuitarType,
  GuitarTypeRus,
  UNDEFINED_GUITAR_TYPE
  // COUPON_VALUES
} from './const';

export const getGuitarTypeRus = (typeGuitar: string): string => {
  switch (typeGuitar) {
    case GuitarType.Acoustic: {
      return GuitarTypeRus.Acoustic;
    }
    case GuitarType.Electric: {
      return GuitarTypeRus.Electric;
    }
    case GuitarType.Ukulele: {
      return GuitarTypeRus.Ukulele;
    }
    default: {
      return UNDEFINED_GUITAR_TYPE;
    }
  }
};
