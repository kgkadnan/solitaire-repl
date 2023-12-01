import { Product, TableColumn } from '@/app/search/result/result-interface';
import { useState } from 'react';

export const useDataTableStateManagement = () => {
  const [rows, setRows] = useState<Product[]>([]);
  const [tableColumns, setTableColumns] = useState<TableColumn[]>([]);
  return {
    dataTableState: {
      rows,
      tableColumns,
    },
    dataTableSetState: {
      setRows,
      setTableColumns,
    },
  };
};
