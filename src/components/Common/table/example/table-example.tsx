import React from "react";
import { Tabel } from "../table";
import style from "./table-example.module.scss";

export const Tabelexample = () => {
  const tableData = {
    tableHeads: ["invoice", "paymentStatus", "totalAmount", "paymentMethod"],
    bodyData: [
      {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
      },
    ],
  };

  const tableAllStyle = {
    headerStyle: style.tableHead,
    bodyStyle: style.tablebody,
  };

  return <Tabel tableData={tableData} tableAllStyle={tableAllStyle} />;
};
