import React, { useState } from 'react';
import { IYourSelection, Product, TableColumn } from '../result-interface';

export const useCommonDtateManagement = () => {
  const [yourSelectionData, setYourSelectionData] = useState<IYourSelection[]>(
    []
  );
  const [totalAmount, setTotalAmount] = useState(0);
  const [averageDiscount, setAverageDiscount] = useState(0);
  const [rows, setRows] = useState<Product[]>([]);
  const [tableColumns, setTableColumns] = useState<TableColumn[]>([]);
  const [saveSearchName, setSaveSearchName] = useState<string>('');
  return {
    commonState: {
      yourSelectionData,
      totalAmount,
      averageDiscount,
      rows,
      tableColumns,
      saveSearchName,
    },
    commonSetState: {
      setYourSelectionData,
      setTotalAmount,
      setAverageDiscount,
      setRows,
      setTableColumns,
      setSaveSearchName,
    },
  };
};
