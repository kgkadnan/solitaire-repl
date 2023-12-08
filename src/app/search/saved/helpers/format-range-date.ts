export const formatRangeData = (data: { lte: number; gte: number }) => {
  const range = data;
  if (range && range.lte && range.gte) {
    return `${range.gte}-${range.lte}`;
  }
  return '-';
};
