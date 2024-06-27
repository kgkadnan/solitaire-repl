import { formatNumberWithCommas } from '@/utils/format-number-with-comma';
import { ManageLocales } from '@/utils/v2/translate';
import React, { useEffect, useState } from 'react';
interface INewArrivalCalculatedField {
  rows: any[];
  selectedProducts: Record<string, boolean>;
  showMyCurrentBid?: boolean;
}

const NewArrivalCalculatedField = ({
  rows,
  selectedProducts,
  showMyCurrentBid
}: INewArrivalCalculatedField) => {
  const [selectedRows, setSelectedRows] = useState<any[]>(
    rows.filter((row: any) => row.id in selectedProducts)
  );

  useEffect(() => {
    setSelectedRows(rows.filter((row: any) => row.id in selectedProducts));
  }, [selectedProducts]);

  let computeTotal = (type: string) => {
    let total = 0;
    if (selectedRows?.length > 0) {
      selectedRows.forEach(row => {
        if (type === 'amount' && row.price !== null) {
          total += row.price;
        } else if (type === 'carats' && row.carats !== null) {
          total += row.carats;
        } else if (type === 'rap_value' && row.rap_value !== null) {
          total += row.rap_value;
        }
      });
    }
    return total.toFixed(2);
  };

  let calculateDiscountAverage = () => {
    let sumAmount = Number(computeTotal('amount')); // Convert to number
    let sumRapVal = Number(computeTotal('rap_value')); // Convert to number

    // Check for division by zero
    if (sumRapVal === 0) {
      return '0.00'; // or some appropriate value or error message
    }

    let average = (sumAmount / sumRapVal - 1) * 100;

    return `${average.toFixed(2)}%`;
  };
  let calculatePRCTAverage = () => {
    let sumAmount = Number(computeTotal('amount')); // Convert to number
    let sumCarats = Number(computeTotal('carats')); // Convert to number

    // Check for division by zero
    if (sumCarats === 0) {
      return '0.00'; // or some appropriate value or error message
    }

    let average = sumAmount / sumCarats;

    return average.toFixed(2); // Format to two decimal places
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
        label: ManageLocales(
          showMyCurrentBid
            ? 'app.calculatedField.maxDiscount'
            : 'app.calculatedField.discount'
        ),
        value: calculateDiscountAverage()
        // calculateAverage(
        //   showMyCurrentBid ? 'my_current_bid' : 'discount'
        // )
      },
      {
        label: ManageLocales('app.calculatedField.pr/ct'),
        value: `$${formatNumberWithCommas(calculatePRCTAverage())}`
      },
      {
        label: ManageLocales('app.calculatedField.amount'),
        value: `$${formatNumberWithCommas(computeTotal('amount'))}`
      }
    ];

    return informativeData;
  };

  return (
    <div className="flex bg-primarySurface flex-wrap  border-neutral200 items-center h-[24px]">
      {computeField().map(element => {
        return (
          <div
            className="text-sRegular text-neutral900 px-[16px]"
            key={element.label}
          >
            {element.label}: {element.value}
          </div>
        );
      })}
    </div>
  );
};

export default NewArrivalCalculatedField;
