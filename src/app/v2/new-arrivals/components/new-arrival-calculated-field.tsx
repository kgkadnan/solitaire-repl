import { ManageLocales } from '@/utils/v2/translate';
import React, { useEffect, useState } from 'react';
import { IProduct } from '../../search/interface';
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
    // if (Object.keys(selectedProducts).length > 0)
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
        if (
          type === (showMyCurrentBid ? 'my_current_bid' : 'discount') &&
          (showMyCurrentBid ? row.my_current_bid : row.discount) !== null
        ) {
          sum += showMyCurrentBid ? row.my_current_bid : row.discount;
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
        label: ManageLocales(
          showMyCurrentBid
            ? 'app.calculatedField.maxDiscount'
            : 'app.calculatedField.discount'
        ),
        value: calculateAverage(
          showMyCurrentBid ? 'my_current_bid' : 'discount'
        )
      },
      {
        label: ManageLocales('app.calculatedField.pr/ct'),
        value: `$${calculateAverage('pr/ct')}`
      },
      {
        label: ManageLocales('app.calculatedField.amount'),
        value: `$${computeTotal('amount')}`
      }

      // {
      //   label: ManageLocales('app.calculatedField.bidDis'),
      //   value: `$${computeTotal('amount')}`
      // },
      // {
      //   label: ManageLocales('app.calculatedField.bidprct'),
      //   value: `$${computeTotal('amount')}`
      // },
      // {
      //   label: ManageLocales('app.calculatedField.bidAmt'),
      //   value: `$${computeTotal('amount')}`
      // }
    ];

    return informativeData;
  };

  return (
    <div className="flex bg-primarySurface flex-wrap  border-neutral200 items-center h-[40px]">
      {computeField().map(element => {
        return (
          <div
            className="text-mMedium font-medium text-neutral900 px-[16px]"
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
