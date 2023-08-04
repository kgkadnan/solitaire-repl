import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

interface TableData {
  tableHeads: string[];
  bodyData: Record<string, any>[];
}

interface TableStyle {
  headerStyle: string;
  bodyStylr: string;
}

interface TableProps {
  tableData: TableData;
  tableAllStyle: TableStyle;
}

export const Tabel: React.FC<TableProps> = ({ tableData, tableAllStyle }) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {tableData.tableHeads.map((tableHead, index) => {
              return (
                <TableHead key={index} className={tableAllStyle.headerStyle}>
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
                  <TableCell key={index} className={tableAllStyle.bodyStylr}>
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
