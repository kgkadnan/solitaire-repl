import { ITheadProps } from './interface';
import styles from './custom-table.module.scss';
import { Checkbox } from '@/components/ui/checkbox';

export const Thead: React.FC<ITheadProps> = ({
  selectionAllowed,
  handleSelectAllCheckbox,
  isCheckAll,
  tableCol,
}) => {
  return (
    <thead className={styles.tableHeader}>
      <tr>
        {selectionAllowed && (
          <th>
            <div className={`flex text-center`}>
              <Checkbox
                onClick={handleSelectAllCheckbox}
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
              position: `${index === 0 ? 'sticky' : 'static'}`,
            }}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};
