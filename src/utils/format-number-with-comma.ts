export const formatNumberWithCommas = (number: any) => {
  return new Intl.NumberFormat().format(number);
};
