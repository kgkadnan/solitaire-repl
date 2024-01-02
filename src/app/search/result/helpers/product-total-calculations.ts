import { IProduct } from '../result-interface';

interface ICalculateTotal {
  isCheck: string[];
  rows: IProduct[];
  type: 'amount' | 'carat';
}

export function calculateTotal({
  isCheck,
  rows,
  type
}: ICalculateTotal): number {
  let total = 0;

  isCheck.forEach(id => {
    const selectedRow = rows.find(row => row.id === id);

    if (selectedRow) {
      if (type === 'amount') {
        const variant = selectedRow.variants.find(
          variant => variant.prices.length > 0
        );
        if (variant) {
          total += variant.prices[0].amount;
        }
      } else if (type === 'carat' && selectedRow.carat !== null) {
        total += selectedRow.carat;
      }
    }
  });

  return total;
}
