export const validatePriceInput = (price: string): string => {
  const priceRegex = /[^0-9]/;
  if (!priceRegex.test(price.toString())) {
    return 'Значение не может быть меньше нуля';
  }
  return '';
};
