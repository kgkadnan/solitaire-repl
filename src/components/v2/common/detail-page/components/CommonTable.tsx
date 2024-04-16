// components/ResponsiveTable.tsx
import React from 'react';

export interface TableColumn {
  key: string;
  label: string;
  hiddenBelow1024?: boolean;
  hiddenAbove1024?: boolean;
}

export interface TableData {
  [key: string]: string | number;
}

interface ResponsiveTableProps {
  tableHead: TableColumn[];
  tableData: TableData[];
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  tableHead,
  tableData
}) => {
  // min-w-full
  return (
    <div className="overflow-x-auto" style={{ borderRadius: '4px' }}>
      <table className="divide-y divide-[#E4E7EC] border  border-[#E4E7EC] overflow-x-scroll rounded-[4px] border-separate border-spacing-0">
        <thead className="bg-neutral50  leading-5 text-[#475467]">
          <tr className="sm:text-[8px] lg:text-[14px] ">
            {tableHead.map((column, index) => (
              <th
                key={column.key}
                className={`p-[10px] lg:px-3 lg:py-3 text-left !font-regular whitespace-nowrap text-mRegular ${
                  column.hiddenAbove1024 ? 'lg:hidden' : ''
                } ${column.hiddenBelow1024 ? 'hidden lg:table-cell' : ''}`}
                style={{
                  // outline: "1px solid #E4E7EC",
                  borderRadius: '4px'
                  // Adjust the min-width as needed
                }}
              >
                {column.label}
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
              {tableHead.map((column, index) => (
                <td
                  key={column.key}
                  style={{
                    borderRadius: '4px'
                    // outline: "1px solid #E4E7EC",
                  }}
                  className={`p-[9px] lg:p-3 whitespace-nowrap ${
                    column.hiddenAbove1024 ? 'lg:hidden' : ''
                  } ${column.hiddenBelow1024 ? 'hidden lg:table-cell' : ''}`}
                >
                  {column.key === 'amount'
                    ? row?.variants?.length > 0
                      ? row?.variants[0]?.prices[0]?.amount
                        ? `${
                            row?.variants[0]?.prices[0]?.amount?.toFixed(2) ??
                            ''
                          }`
                        : ''
                      : row?.amount
                      ? `${row?.amount?.toFixed(2) ?? ''}`
                      : ''
                    : typeof row[column.key] === 'string'
                    ? row[column.key]
                    : row[column.key]?.toString() || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResponsiveTable;
