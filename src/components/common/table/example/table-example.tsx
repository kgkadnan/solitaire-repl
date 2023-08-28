import React from 'react';
import style from './table-example.module.scss';
import { CustomTable } from '../table';

export const TableExample = () => {
  const tableData = {
    tableHeads: ['invoice', 'paymentStatus', 'totalAmount', 'paymentMethod'],
    bodyData: [
      {
        invoice: 'INV001',
        paymentStatus: 'Paid',
        totalAmount: '$250.00',
        paymentMethod: 'Credit Card',
      },
    ],
  };

  const tableAllStyle = {
    tableHeaderStyle: style.tableHead,
    tableBodyStyle: style.tablebody,
  };

  return (
    <CustomTable tableData={tableData} tableStyleClasses={tableAllStyle} />
  );
};
