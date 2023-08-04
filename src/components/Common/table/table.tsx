import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

interface fullTableData {
  tableHeads: string[];
  bodyData: Record<string, any>[];
}

interface tableStyle {
  headerStyle: string;
  bodyStylr: string;
}

interface tableProps {
  tableData: fullTableData;
  tableAllStyle: tableStyle;
}

export const Tabel: React.FC<tableProps> = ({ tableData, tableAllStyle }) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {tableData.tableHeads.map((tableHead) => {
              return (
                <TableHead className={tableAllStyle.headerStyle}>
                  {tableHead}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.bodyData.map((bodyData, index) => (
            <>
              <TableRow key={`${tableData.tableHeads}-${index}`}>
                {Object.keys(bodyData).map((item) => {
                  return (
                    <TableCell className={tableAllStyle.bodyStylr}>
                      {bodyData[item]}
                    </TableCell>
                  );
                })}
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
