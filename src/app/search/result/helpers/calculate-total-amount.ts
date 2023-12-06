import { Product } from '../result-interface';

interface ICalculateTotalAmount {
  isCheck: string[];
  rows: Product[];
}
export function calculateTotalAmount({ isCheck, rows }: ICalculateTotalAmount) {
  let total = 0;

  isCheck.forEach(id => {
    const selectedRow = rows.find(row => row.id === id);
    if (selectedRow) {
      const variant = selectedRow.variants.find(
        variant => variant.prices.length > 0
      );
      if (variant) {
        total += variant.prices[0].amount;
      }
    }
  });

  return total;
}
