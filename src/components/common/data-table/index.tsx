import React from 'react';
import styles from './custom-table.module.scss';
import { ICustomDataTableProps } from './interface';
import { TableHead } from './components/table-head';
import { TableBody } from './components/table-body';

const CustomDataTable: React.FC<ICustomDataTableProps> = ({
  tableRows,
  tableColumns,
  checkboxData = {},
  mainTableStyle,
  selectionAllowed = true,
  errorSetState,
  confirmStoneSetState,
  modalSetState
}) => {
  /* The above code is filtering and sorting an array of table columns. */
  const tableCol = tableColumns
    ?.filter(column => !column.is_disabled)
    ?.sort((a, b) => a.sequence - b.sequence);

  return (
    <div className={'flex-grow overflow-y-auto'}>
      <div className={`${styles.tableWrapper} ${mainTableStyle}`}>
        <table className={styles.table}>
          <TableHead
            selectionAllowed={selectionAllowed}
            checkboxData={checkboxData}
            tableCol={tableCol}
            rows={tableRows}
          />
          <TableBody
            tableRows={tableRows}
            selectionAllowed={selectionAllowed}
            checkboxData={checkboxData}
            tableCol={tableCol}
            errorSetState={errorSetState}
            confirmStoneSetState={confirmStoneSetState}
            modalSetState={modalSetState}
          />
        </table>
      </div>
    </div>
  );
};

export default CustomDataTable;
