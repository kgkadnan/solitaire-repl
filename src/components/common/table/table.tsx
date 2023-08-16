import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import React from "react";

// Interface for the data of the table
interface ITableData {
  tableHeads: string[];
  bodyData: Record<string, any>[];
}

// Interface for the styles of the table
interface ITableStyle {
  tableHeaderStyle: string;
  tableBodyStyle: string;
}

// Interface for the props of the Table component
interface TableProps {
  tableData: ITableData;
  tableStyleClasses: ITableStyle;
}

// CustomTable component definition
export const CustomTable: React.FC<TableProps> = ({
  tableData,
  tableStyleClasses,
}) => {
  // Destructure styles from the props
  const { tableHeaderStyle, tableBodyStyle } = tableStyleClasses;
  return (
    <>
      {/* Table component */}
      <Table>
        {/* Table header */}
        <TableHeader>
          <TableRow>
            {/* Map through tableHeads to create table header cells */}
            {tableData.tableHeads.map((tableHead) => {
              return (
                <TableHead key={tableHead} className={`${tableHeaderStyle}`}>
                  {tableHead}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>

        {/* Table body */}
        <TableBody>
          {/* Map through bodyData to create table rows */}
          {tableData.bodyData.map((bodyData) => (
            <TableRow key={`bodyData-${tableData.tableHeads}`}>
              {/* Map through each property in bodyData to create table cells */}
              {Object.keys(bodyData).map((item) => {
                return (
                  <TableCell
                    key={`row-${tableData.tableHeads}`}
                    className={`${tableBodyStyle}`}
                  >
                    {bodyData[item]}
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
