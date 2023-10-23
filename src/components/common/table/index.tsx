import { formatCassing } from '@/utils/format-cassing';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import React from 'react';

// Interface for the data of the table
interface ITableData {
  tableHeads: any;
  bodyData: any;
}

// Interface for the styles of the table
interface ITableStyle {
  tableHeaderStyle: string;
  tableBodyStyle: string;
  tableStyle?: string;
}

// Interface for the props of the Table component
interface ITableProps {
  tableData: ITableData;
  tableStyleClasses: ITableStyle;
}

// CustomTable component definition
export const CustomTable: React.FC<ITableProps> = ({
  tableData,
  tableStyleClasses,
}) => {
  console.log('ttttttttttttttttttttttttt', tableData.bodyData);

  // Destructure styles from the props
  const { tableHeaderStyle, tableBodyStyle, tableStyle } = tableStyleClasses;
  return (
    <>
      {/* Table component */}
      <Table className={`${tableStyle}`}>
        {/* Table header */}
        <TableHeader>
          <TableRow>
            {/* Map through tableHeads to create table header cells */}
            {tableData.tableHeads.map((tableHead: any, index: number) => {
              return (
                <TableHead
                  key={`tablehead-${index}`}
                  className={`${tableHeaderStyle}`}
                >
                  {formatCassing(tableHead)}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>

        {/* Table body */}
        <TableBody>
          {/* Map through bodyData to create table rows */}
          {tableData.bodyData.map((bodyData: any, rowIndex: number) => (
            <TableRow key={`row-${rowIndex}`}>
              {Object.keys(bodyData).map((item, cellIndex) => {
                return (
                  <TableCell
                    key={`cell-${rowIndex}-${cellIndex}`}
                    className={`whitespace-nowrap ${tableBodyStyle} `}
                  >
                    {Array.isArray(bodyData[item]) && bodyData[item].length > 1
                      ? bodyData[item].toString().substring(0, 3).concat('...')
                      : bodyData[item]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
