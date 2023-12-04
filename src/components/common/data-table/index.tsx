import React, { ReactNode, useState } from 'react';
import styles from './custom-table.module.scss';
import { CustomDialog } from '../dialog';
import { ICustomDataTableProps } from './interface';
import { Thead } from './components/Thead';
import { Tbody } from './components/Tbody';

const CustomDataTable: React.FC<ICustomDataTableProps> = ({
  tableRows,
  tableColumns,
  checkboxData = {},
  mainTableStyle,
  selectionAllowed = true,
  handleConfirm,
}) => {
  const [dialogContent, setDialogContent] = useState<ReactNode>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  /* The above code is filtering and sorting an array of table columns. */
  let tableCol = tableColumns
    ?.filter((column) => !column.is_disabled)
    ?.sort((a, b) => a.sequence - b.sequence);

  return (
    <>
      <CustomDialog
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />

      <div className={'flex-grow overflow-y-auto'}>
        <div className={`${styles.tableWrapper} ${mainTableStyle}`}>
          <table className={styles.table}>
            <Thead
              selectionAllowed={selectionAllowed}
              checkboxData={checkboxData}
              tableCol={tableCol}
              rows={tableRows}
            />
            <Tbody
              tableRows={tableRows}
              selectionAllowed={selectionAllowed}
              checkboxData={checkboxData}
              tableCol={tableCol}
              setDialogContent={setDialogContent}
              setIsDialogOpen={setIsDialogOpen}
              handleConfirm={handleConfirm}
            />
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomDataTable;
