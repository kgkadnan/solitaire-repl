import React from 'react';

import { ITheadProps } from '../interface';
import styles from '../custom-table.module.scss';
import { Checkbox } from '@/components/ui/checkbox';
import { handleSelectAllCheckbox } from '../../checkbox/helper/handle-select-all-checkbox';
import Tooltip from '../../tooltip';

export const TableHead: React.FC<ITheadProps> = ({
  selectionAllowed,
  checkboxData,
  tableCol,
  rows
}) => {
  const { checkboxState, checkboxSetState } = checkboxData ?? {};
  const { isCheckAll } = checkboxState ?? {};
  const { setIsCheckAll, setIsCheck } = checkboxSetState ?? {};

  return (
    <thead className={styles.tableHeader}>
      <tr>
        {selectionAllowed && (
          <th>
            <div className={`flex text-center`}>
              <Checkbox
                onClick={() =>
                  handleSelectAllCheckbox({
                    setIsCheckAll,
                    isCheckAll,
                    setIsCheck,
                    data: rows
                  })
                }
                data-testid={'Select All Checkbox'}
                checked={isCheckAll}
              />
            </div>
          </th>
        )}

        {tableCol?.map((column, index) => (
          <th
            key={column.accessor}
            className={`${styles.tableHead}`}
            style={{
              left: `${index === 0 && selectionAllowed ? '45px' : '0px'}`,
              position: `${index === 0 ? 'sticky' : 'static'}`
            }}
          >
            <Tooltip
              tooltipElement={column.short_label}
              content={column.label}
              tooltipStyles={{
                tooltipContentStyle:
                  '!rounded-[4px] !px-[10px] !py-[5px] !bg-solitaireSenary'
              }}
              // Optional: You can add tooltipStyles and handleEvent props here
            />
          </th>
        ))}
      </tr>
    </thead>
  );
};
