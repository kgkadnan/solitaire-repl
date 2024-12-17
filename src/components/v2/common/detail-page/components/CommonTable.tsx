// components/ResponsiveTable.tsx
import { formatNumber } from '@/utils/fix-two-digit-number';
import React from 'react';
import { IImagesType } from '../interface';
import { Skeleton } from '@mui/material';
import { formatNumberWithCommas } from '@/utils/format-number-with-comma';
import { RednderLocation } from '@/components/v2/table/helpers/render-cell';

export interface ITableColumn {
  key: string;
  label: string;
  hiddenBelow1024?: boolean;
  hiddenAbove1024?: boolean;
}

export interface ITableData {
  [key: string]: string | number;
}

interface IResponsiveTableProps {
  tableHead: ITableColumn[];
  tableData: ITableData[];
  validImages: IImagesType[];
}

const ResponsiveTable: React.FC<IResponsiveTableProps> = ({
  tableHead,
  tableData,
  validImages
}) => {
  return (
    <div className="overflow-x-auto" style={{ borderRadius: '4px' }}>
      <table className="divide-y divide-[#E4E7EC] border  border-[#E4E7EC] overflow-x-scroll rounded-[4px] border-separate border-spacing-0">
        <thead
          className={`${
            validImages.length > 0 ? 'bg-neutral50' : 'bg-[#E3E3E3]'
          }  leading-5 text-[#475467]`}
        >
          <tr className="sm:text-[8px] lg:text-[14px] ">
            {tableHead.map((column, index) => (
              <th
                key={column.key}
                className={`p-[10px] lg:px-3 lg:py-3 h-[44px] text-left !font-regular whitespace-nowrap text-mRegular ${
                  column.hiddenAbove1024 ? 'lg:hidden' : ''
                } ${column.hiddenBelow1024 ? 'hidden lg:table-cell' : ''}
                ${
                  index === 0
                    ? 'rounded-tl-[4px]'
                    : index === tableHead.length - 1
                    ? 'rounded-tr-[4px]'
                    : ''
                }`}
              >
                {validImages.length > 0 ? column.label : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className="bg-white divide-y divide-[#E4E7EC]"
          style={{ borderTop: 'unset' }}
        >
          {tableData.map((row: any, rowIndex) => (
            <tr
              key={rowIndex}
              className="font-medium sm:text-10px lg:text-[14px] leading-5 text-left text-rgba-101828"
            >
              {tableHead.map(column => {
                return (
                  <td
                    key={column.key}
                    style={{
                      borderRadius: '4px'
                    }}
                    className={`p-[9px] lg:p-3 whitespace-nowrap ${
                      column.hiddenAbove1024 ? 'lg:hidden' : ''
                    } ${column.hiddenBelow1024 ? 'hidden lg:table-cell' : ''}`}
                  >
                    {validImages.length > 0 ? (
                      column.key === 'location' ? (
                        <div className="flex gap-1 items-center">
                          {RednderLocation({
                            renderedCellValue: row[column.key]
                          })}

                          {row[column.key]}
                        </div>
                      ) : column.key === 'amount' ? (
                        row?.variants?.length > 0 ? (
                          row?.variants[0]?.prices[0]?.amount ? (
                            `$${
                              formatNumberWithCommas(
                                row?.variants[0]?.prices[0]?.amount
                              ) ?? '-'
                            }`
                          ) : (
                            '-'
                          )
                        ) : row?.amount ? (
                          `$${formatNumberWithCommas(row?.amount) ?? '-'}`
                        ) : (
                          '-'
                        )
                      ) : column.key === 'rap' ? (
                        row[column.key] === undefined ||
                        row[column.key] === null ? (
                          '-'
                        ) : (
                          `$${formatNumberWithCommas(row[column.key])}`
                        )
                      ) : column.key === 'rap_value' ? (
                        row[column.key] === undefined ||
                        row[column.key] === null ? (
                          '-'
                        ) : (
                          `$${formatNumberWithCommas(row[column.key])}`
                        )
                      ) : column.key === 'price_per_carat' ? (
                        `${
                          row[column.key] === undefined ||
                          row[column.key] === null
                            ? '-'
                            : `$${formatNumberWithCommas(row[column.key])}`
                        }`
                      ) : typeof row[column.key] === 'number' ? (
                        formatNumber(row[column.key]) ?? '-'
                      ) : typeof row[column.key] === 'string' ? (
                        row[column.key]
                      ) : (
                        row[column.key]?.toString() || '-'
                      )
                    ) : (
                      <Skeleton
                        width={60}
                        sx={{ bgcolor: 'var(--neutral-200)' }}
                        variant="rectangular"
                        animation="wave"
                        className="rounded-[4px]"
                      />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResponsiveTable;
