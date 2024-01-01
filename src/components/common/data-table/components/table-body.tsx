import React from 'react';

import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { IProduct, ITableColumn } from '@/app/search/result/result-interface';
import { CustomDisplayButton } from '../../buttons/display-button';
import { ManageLocales } from '@/utils/translate';
import { CustomDropdown } from '../../dropdown';
import { useAddCartMutation } from '@/features/api/cart';
import confirmImage from '@public/assets/icons/confirmation.svg';
import { CustomCheckBox } from '../../checkbox';
import Image from 'next/image';
import { ITbodyProps } from '../interface';
import styles from '../custom-table.module.scss';
import { GIA_LINK, MEMO_OUT_STATUS } from '@/constants/business-logic';
import { handleCheckboxClick } from '../../checkbox/helper/handle-checkbox-click';
import { useDataTableBodyStateManagement } from '../hooks/data-table-body-state-management';
import { DetailImageSlider } from './detail-image-slider';
import { DetailCertificateSlider } from './detail-certificate-slider';
import { DiamondDetailSlider } from './diamond-detail-slider';
import { handleConfirmStone } from '../../confirm-stone/helper/handle-confirm';
import { performDownloadExcel } from '@/utils/perform-download-excel';
import Link from 'next/link';
import logger from 'logging/log-util';

export const TableBody: React.FC<ITbodyProps> = ({
  tableRows,
  selectionAllowed,
  checkboxData,
  tableCol,
  errorSetState,
  confirmStoneSetState,
  confirmStoneState,
  modalSetState
}) => {
  const { checkboxState, checkboxSetState } = checkboxData ?? {};
  const { isCheck, isCheckAll } = checkboxState ?? {};
  const { setIsCheckAll, setIsCheck } = checkboxSetState ?? {};

  const { setErrorText, setIsError } = errorSetState;
  const { setConfirmStoneData, setIsComeFromConfirmStone } =
    confirmStoneSetState ?? {};
  const {
    setIsDialogOpen,
    setIsSliderOpen,
    setDialogContent,
    setPersistDialogContent,
    setIsPersistDialogOpen
  } = modalSetState ?? {};

  const { dataTableBodyState, dataTableBodySetState } =
    useDataTableBodyStateManagement();

  const { sliderData } = dataTableBodyState!;

  const [addCart] = useAddCartMutation();
  const [downloadExcel] = useDownloadExcelMutation();

  /* The above code is defining a function called `addToCart`. */
  const addToCart = () => {
    if (sliderData[0].diamond_status === MEMO_OUT_STATUS) {
      logger.info('Memoout');
    } else if (sliderData[0]) {
      addCart({
        variants: [sliderData[0]?.variants[0].id]
      })
        .unwrap()
        .then(res => {
          setPersistDialogContent?.(
            <div className="text-center  flex flex-col justify-center items-center ">
              <div className="w-[350px] flex justify-center items-center mb-3">
                <Image src={confirmImage} alt="vector image" />
              </div>
              <div className="w-[350px]  text-center text-solitaireTertiary pb-3">
                {res?.message}
              </div>
              <Link
                href={'/my-cart?active-tab=active'}
                className={` p-[6px] w-[150px] bg-solitaireQuaternary text-[#fff] text-[14px] rounded-[5px]`}
              >
                Go To Cart
              </Link>
            </div>
          );
          setIsPersistDialogOpen?.(true);
        })
        .catch(error => {
          logger.error(error);
        });
    }
  };

  /**
   * The `downloadExcelFunction` is a function that downloads an Excel file based on the `sliderData` and
   * displays a success message in a dialog box.
   */
  const downloadExcelFunction = () => {
    if (sliderData[0]) {
      performDownloadExcel({
        products: [sliderData[0].id],
        downloadExcelApi: downloadExcel,
        setDialogContent,
        setIsDialogOpen,
        setIsCheck,
        setIsCheckAll,
        setIsError
      });
    }
  };

  const footerButtonData = [
    {
      id: 1,
      displayButtonLabel: (
        <CustomDropdown
          dropdownTrigger={
            <CustomDisplayButton
              displayButtonLabel={ManageLocales('app.searchResult.footer.more')}
              displayButtonAllStyle={{
                displayButtonStyle: styles.transparent
              }}
            />
          }
          dropdownMenu={[
            {
              label: 'Share',
              fn: ''
            },
            {
              label: 'Download Excel',
              fn: () => downloadExcelFunction()
            },
            {
              label: 'Find Matching Pair',
              fn: ''
            }
          ]}
        />
      )
    },
    // Conditionally include this block only if isComeFromConfirmStone is false
    !confirmStoneState?.isComeFromConfirmStone && {
      id: 2,
      displayButtonLabel: ManageLocales('app.searchResult.footer.confirmStone'),
      style: styles.transparent,
      fn: () =>
        handleConfirmStone?.(
          [sliderData[0]?.id],
          tableRows,
          setErrorText,
          setIsError,
          setIsSliderOpen,
          setConfirmStoneData,
          setIsComeFromConfirmStone
        )
    },
    {
      id: 3,
      displayButtonLabel: ManageLocales('app.searchResult.footer.addToCart'),
      style: styles.filled,
      fn: addToCart
    }
  ];

  const handleRowClick = (row: IProduct) => {
    handleCheckboxClick({
      id: row.id,
      isCheck,
      setIsCheck,
      setIsCheckAll,
      isCheckAll,
      data: tableRows,
      setIsError
    });
  };

  const renderCellContent = (column: ITableColumn, row: any, index: number) => {
    switch (column.accessor) {
      case 'details':
        return (
          <button
            className="flex items-center gap-2"
            onClick={e => e.stopPropagation()}
          >
            <DetailImageSlider
              dataTableBodyState={dataTableBodyState}
              dataTableBodySetState={dataTableBodySetState}
              tableRows={tableRows}
              index={index}
              row={row}
            />
            <DetailCertificateSlider
              dataTableBodyState={dataTableBodyState}
              dataTableBodySetState={dataTableBodySetState}
              row={row}
              tableRows={tableRows}
              index={index}
            />
          </button>
        );
      case 'lot_id':
        return (
          <button onClick={e => e.stopPropagation()}>
            <DiamondDetailSlider
              dataTableBodyState={dataTableBodyState}
              dataTableBodySetState={dataTableBodySetState}
              tableRows={tableRows}
              index={index}
              row={row}
              column={column}
              footerButtonData={footerButtonData}
              modalSetState={modalSetState}
            />
          </button>
        );
      case 'lab':
        return (
          <a
            href={`${GIA_LINK}${row.rpt_number}`}
            target="_blank"
            className="border-b border-solitaireQuaternary border-solid"
            onClick={e => e.stopPropagation()}
          >
            {row[column.accessor] !== null ? row[column.accessor] : '-'}
          </a>
        );
      case 'amount':
        return row.variants[0].prices[0].amount;
      default:
        return row[column.accessor] ?? '-';
    }
  };

  return (
    <tbody className={styles.tableBody}>
      {tableRows?.map((row: IProduct, index: number) => (
        <tr
          key={row.id}
          className={styles.tableRow}
          onClick={() => handleRowClick(row)}
        >
          {selectionAllowed && (
            <td>
              <CustomCheckBox
                data={row.id}
                isChecked={isCheck ?? []}
                setIsCheck={setIsCheck}
                setIsCheckAll={setIsCheckAll}
                isCheckAll={isCheckAll}
                row={tableRows}
                setIsError={setIsError}
              />
            </td>
          )}

          {tableCol?.map((column: ITableColumn, tableColindex: number) => (
            <td
              style={{
                left: `${
                  tableColindex === 0 && selectionAllowed ? '45px' : '0px'
                }`,
                position: `${tableColindex === 0 ? 'sticky' : 'static'}`
              }}
              key={`${row.id}-${column.accessor}`}
              className={`${styles.tableData} cursor-pointer`}
            >
              {renderCellContent(column, row, index)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
