import { IProduct } from '../result-interface';

interface ICalculateAverageDiscount {
  isCheck: string[];
  rows: IProduct[];
  property: keyof IProduct;
}

export function calculateAverage({
  isCheck,
  rows,
  property
}: ICalculateAverageDiscount): number {
  const total = isCheck.reduce((acc, id) => {
    const selectedRow = rows.find(row => row.id === id);
    return selectedRow && selectedRow[property] !== null
      ? acc + Number(selectedRow[property]!)
      : acc;
  }, 0);

  return isCheck.length > 0 ? total / isCheck.length : 0;
}
