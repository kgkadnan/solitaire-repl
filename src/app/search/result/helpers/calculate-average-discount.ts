import { Product } from '../result-interface';

interface ICalculateAverageDiscount {
  isCheck: string[];
  rows: Product[];
}
export function calculateAverageDiscount({
  isCheck,
  rows
}: ICalculateAverageDiscount) {
  let totalDiscount = 0;
  isCheck.forEach(id => {
    const selectedRow = rows.find(row => row.id === id);
    if (selectedRow) {
      totalDiscount += selectedRow?.discount;
    }
  });
  // Calculate average discount
  const avgDiscount = isCheck.length > 0 ? totalDiscount / isCheck.length : 0;
  return avgDiscount;
}
