import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import React from "react";

interface ITableData {
  tableHeads: string[];
  bodyData: Record<string, any>[];
}

interface ITableStyle {
  tableHeaderStyle: string;
  tableBodyStyle: string;
}

interface TableProps {
  tableData: ITableData;
  tableStyleClasses: ITableStyle;
}

export const CustomTable: React.FC<TableProps> = ({
  tableData,
  tableStyleClasses,
}) => {
  const { tableHeaderStyle, tableBodyStyle } = tableStyleClasses;
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {tableData.tableHeads.map((tableHead, index) => {
              return (
                <TableHead key={index} className={`${tableHeaderStyle}`}>
                  {tableHead}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.bodyData.map((bodyData, index) => (
            <TableRow key={index}>
              {Object.keys(bodyData).map((item, index) => {
                return (
                  <TableCell key={index} className={`${tableBodyStyle}`}>
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
