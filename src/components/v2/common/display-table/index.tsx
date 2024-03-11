import { formatCassing } from '@/utils/format-cassing';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../ui/table';

// Interface for the styles of the table
interface IDisplayTableStyle {
  tableHeaderStyle: string;
  tableBodyStyle: string;
  tableStyle?: string;
}

// Interface for the props of the Table component
interface IDisplayTableProps {
  column: {
    accessor: string;
    label: string;
    sequence: number;
    short_label: string;
  }[];
  row: any;
  tableStyleClasses?: IDisplayTableStyle;
}

// DisplayTable component definition
export const DisplayTable: React.FC<IDisplayTableProps> = ({
  column,
  row,
  tableStyleClasses
}) => {
  return (
    <>
      {/* Table component */}
      <div className="overflow-auto">
        <Table
          className={`border-[1px] border-neutral200 ${tableStyleClasses?.tableStyle}`}
        >
          {/* Table header */}
          <TableHeader>
            <TableRow>
              {/* Map through tableHeads to create table header cells */}
              {column.map(({ label, sequence }) => {
                return (
                  <TableHead
                    key={`${sequence}`}
                    className={`bg-neutral50 border-[1px] border-neutral200 text-mMedium  px-[16px] py-[12px] text-neutral900 font-medium ${tableStyleClasses?.tableHeaderStyle}`}
                  >
                    {formatCassing(label)}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>

          {/* Table body */}
          <TableBody>
            {/* Map through bodyData to create table rows */}
            {row.map((row: any, index: number) => (
              <TableRow key={`row-${index}`} className="bg-neutral0">
                {column.map(({ accessor, sequence }) => {
                  return (
                    <TableCell
                      key={`${sequence}`}
                      className={`whitespace-nowrap text-mMedium  px-[16px] py-[12px] text-neutral900 font-medium ${tableStyleClasses?.tableBodyStyle} `}
                    >
                      {Array.isArray(row[accessor]) && row[accessor].length > 1
                        ? row[accessor].toString().substring(0, 3).concat('...')
                        : row[accessor] ?? '-'}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
