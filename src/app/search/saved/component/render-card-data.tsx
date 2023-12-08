import { useCallback, useMemo } from 'react';
import { IFormatedData, KeyLabelMapping } from '../saved-interface';
import { CustomTable } from '@/components/common/table';
import editIcon from '@public/assets/icons/edit.svg';
import styles from '../saved.module.scss';
import { formatCreatedAt } from '@/utils/format-date';

const RenderCardData = ({ data }: any) => {
  const tableStyles = useMemo(() => {
    return {
      tableHeaderStyle: styles.tableHeader,
      tableBodyStyle: styles.tableBody
    };
  }, []);

  const searchCardTitle = useMemo(() => {
    return {
      tableHeaderStyle: styles.SearchCardTitle,
      tableBodyStyle: styles.SearchDateTime
    };
  }, []);

  const keyLabelMapping: KeyLabelMapping = useMemo(() => {
    return {
      shape: 'Shape',
      carat: 'carat',
      color: 'color',
      clarity: 'clarity',
      cut: 'cut',
      polish: 'polish',
      symmetry: 'Symmetry',
      price_range: 'Price Range',
      discount: 'Discount'
    };
  }, []);

  const formatRangeData = (data: { lte: number; gte: number }) => {
    const range = data;
    if (range && range.lte && range.gte) {
      return `${range.gte}-${range.lte}`;
    }
    return '-';
  };

  const renderCardData = useMemo(() => {
    return data?.map((item: any) => {
      // Filter the data based on the keyLabelMapping
      const filteredData: IFormatedData = {};
      for (const key in keyLabelMapping) {
        if (item.meta_data && !Array.isArray(item.meta_data[key])) {
          filteredData[keyLabelMapping[key]] = formatRangeData(
            item.meta_data[key]
          );
        } else if (
          item.meta_data &&
          Array.isArray(item.meta_data[key]) &&
          typeof item.meta_data[key][0] !== 'string'
        ) {
          filteredData[keyLabelMapping[key]] = formatRangeData(
            item.meta_data[key][0]
          );
        } else {
          filteredData[keyLabelMapping[key]] =
            item.meta_data[key] && item.meta_data[key]?.length
              ? item.meta_data[key]
              : '-';
        }
      }

      const cardContent = (
        <CustomTable
          tableData={{
            tableHeads: Object.keys(filteredData),
            bodyData: [Object.values(filteredData)]
          }}
          tableStyleClasses={tableStyles}
        />
      );

      return {
        id: item.id,
        cardActionIcon: editIcon,
        cardHeader: (
          <CustomTable
            tableData={{
              tableHeads: [item.name],
              bodyData: [
                {
                  desc: (
                    <div className={styles.parentDivHeaderSectiom}>
                      <div style={{ marginRight: '80px' }}>
                        {formatCreatedAt(item.created_at)}
                      </div>
                    </div>
                  )
                }
              ]
            }}
            tableStyleClasses={searchCardTitle}
          />
        ),
        cardContent: cardContent
      };
    });
  }, [data, keyLabelMapping, searchCardTitle, tableStyles]);

  console.log('ssssssssssssssss', renderCardData);

  return <>{renderCardData}</>;
};

export default RenderCardData;
