import { IProduct } from '@/app/v2/search/interface';
import { ManageLocales } from '@/utils/v2/translate';
import React, { useEffect, useState } from 'react';
interface ICalculatedField {
  rows: IProduct[];
  selectedProducts: Record<string, boolean>;
}

const CalculatedField = ({ rows, selectedProducts }: ICalculatedField) => {
  const [selectedRows, setSelectedRows] = useState<IProduct[]>(
    rows.filter((row: IProduct) => row.id in selectedProducts)
  );

  useEffect(() => {
    setSelectedRows(rows.filter((row: IProduct) => row.id in selectedProducts));
  }, [selectedProducts]);

  let computeTotal = (type: string) => {
    let total = 0;
    if (selectedRows?.length > 0) {
      selectedRows.forEach(row => {
        if (type === 'amount') {
          const variant = row.variants.find(
            (variant: any) => variant.prices.length > 0
          );
          if (variant) {
            total += variant.prices[0].amount;
          }
        } else if (type === 'carats' && row.carats !== null) {
          total += row.carats;
        }
      });
    }
    return total.toFixed(2);
  };

  let calculateAverage = (type: string) => {
    let data = selectedRows;
    let sum = 0;
    let average = 0;
    if (data?.length > 0) {
      selectedRows.forEach(row => {
        if (type === 'discount' && row.discount !== null) {
          sum += row.discount;
        } else if (type === 'pr/ct' && row.price_per_carat !== null) {
          sum += row.price_per_carat;
        }
      });
      average = sum / selectedRows.length;
    }

    return average.toFixed(2);
  };

  let computeField = () => {
    let informativeData = [
      {
        label: ManageLocales('app.calculatedField.pieces'),
        value: `${selectedRows.length}/${rows.length}`
      },
      {
        label: ManageLocales('app.calculatedField.carat'),
        value: computeTotal('carats')
      },
      {
        label: ManageLocales('app.calculatedField.discount'),
        value: calculateAverage('discount')
      },
      {
        label: ManageLocales('app.calculatedField.pr/ct'),
        value: `$${calculateAverage('pr/ct')}`
      },
      {
        label: ManageLocales('app.calculatedField.amount'),
        value: `$${computeTotal('amount')}`
      }
    ];

    return informativeData;
  };

  return (
    <div className="flex bg-primarySurface flex-wrap border-b-[1px] border-neutral200 items-center h-[24px]">
      {computeField().map(element => {
        return (
          <div
            className="text-sRegular  text-neutral900 px-[16px]"
            key={element.label}
          >
            {element.label}: {element.value}
          </div>
        );
      })}
    </div>
  );
};

export default CalculatedField;
