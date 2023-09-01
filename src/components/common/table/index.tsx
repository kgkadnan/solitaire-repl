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
  tableHeads: string[];
  bodyData: Record<string, any>[];
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
            {tableData.tableHeads.map((tableHead, index) => {
              return (
                <TableHead
                  key={`tablehead-${index}`}
                  className={`${tableHeaderStyle}`}
                >
                  {tableHead}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>

        {/* Table body */}
        <TableBody>
          {/* Map through bodyData to create table rows */}
          {tableData.bodyData.map((bodyData, rowIndex) => (
            <TableRow key={`row-${rowIndex}`}>
              {Object.keys(bodyData).map((item, cellIndex) => {
                return (
                  <TableCell
                    key={`cell-${rowIndex}-${cellIndex}`}
                    className={`whitespace-nowrap ${tableBodyStyle} `}
                  >
                    {Array.isArray(bodyData[item])
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
