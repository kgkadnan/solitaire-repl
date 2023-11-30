import React, { ReactNode, useState } from 'react';
import styles from './custom-table.module.scss';
import { CustomDialog } from '../dialog';
import { ICustomDataTableProps } from './interface';
import { Thead } from './Thead';
import { Tbody } from './Tbody';

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

  const { handleSelectAllCheckbox, handleClick, isCheck, isCheckAll } =
    checkboxData;

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
              handleSelectAllCheckbox={handleSelectAllCheckbox}
              isCheckAll={isCheckAll}
              tableCol={tableCol}
            />
            <Tbody
              tableRows={tableRows}
              selectionAllowed={selectionAllowed}
              handleClick={handleClick}
              isCheck={isCheck}
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
