import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { downloadExcelFromBase64 } from '@/utils/download-excel-from-base64';
import { TableColumn } from '@/app/search/result/result-interface';
import { CustomDisplayButton } from '../../buttons/display-button';
import { ManageLocales } from '@/utils/translate';
import { CustomDropdown } from '../../dropdown';
import { useAddCartMutation } from '@/features/api/cart';
import confirmImage from '@public/assets/icons/confirmation.svg';
import { CustomCheckBox } from '../../checkbox';
import Image from 'next/image';
import { ITbodyProps } from '../interface';
import styles from '../custom-table.module.scss';
import { FILE_URLS, GIA_LINK } from '@/constants/business-logic';
import { handleCheckboxClick } from '../../checkbox/helper/handle-checkbox-click';
import { useDataTableBodyStateManagement } from '../hooks/data-table-body-state-management';
import { DetailImageSlider } from './detail-image-slider';
import { DetailCertificateSlider } from './detail-certificate-slider';
import { DiamondDetailSlider } from './diamond-detail-slider';
import { handleConfirmStone } from '../../confirm-stone/helper/handle-confirm';

export const TableBody: React.FC<ITbodyProps> = ({
  tableRows,
  selectionAllowed,
  checkboxData,
  tableCol,
  errorSetState,
  confirmStoneSetState,
  modalSetState,
}) => {
  const { checkboxState, checkboxSetState } = checkboxData ?? {};
  const { isCheck, isCheckAll } = checkboxState ?? {};
  const { setIsCheckAll, setIsCheck } = checkboxSetState ?? {};

  const { setErrorText, setIsError } = errorSetState ?? {};
  const { setConfirmStoneData } = confirmStoneSetState ?? {};
  const { setIsDialogOpen, setIsSliderOpen, setDialogContent } =
    modalSetState ?? {};

  const { dataTableBodyState, dataTableBodySetState } =
    useDataTableBodyStateManagement();

  const { sliderData } = dataTableBodyState!;

  const [addCart] = useAddCartMutation();
  let [downloadExcel] = useDownloadExcelMutation();

  /* The above code is defining a function called `addToCart`. */
  const addToCart = () => {
    if (sliderData[0].diamond_status === 'MemoOut') {
      console.log('require error message here');
    } else if (sliderData[0]) {
      addCart({
        variants: [sliderData[0]?.variants[0].id],
      })
        .unwrap()
        .then(() => {
          setDialogContent(
            <>
              <div className="max-w-[400px] flex justify-center align-middle">
                <Image src={confirmImage} alt="vector image" />
              </div>
              <div className="max-w-[400px] flex justify-center align-middle text-solitaireTertiary">
                Download Excel Successfully
              </div>
            </>
          );
          setIsDialogOpen(true);
        })
        .catch(() => {
          console.log('1111111111111111');
        });
    }
  };

  /**
   * The `downloadExcelFunction` is a function that downloads an Excel file based on the `sliderData` and
   * displays a success message in a dialog box.
   */
  const downloadExcelFunction = () => {
    if (sliderData[0]) {
      downloadExcel({
        productIds: sliderData[0].id,
      })
        .unwrap()
        .then((res) => {
          let { data, fileName } = res;
          if (data) {
            downloadExcelFromBase64(data, fileName);
            setDialogContent(
              <>
                <div className="max-w-[400px] flex justify-center align-middle">
                  <Image src={confirmImage} alt="vector image" />
                </div>
                <div className="max-w-[400px] flex justify-center align-middle text-solitaireTertiary">
                  Download Excel Successfully
                </div>
              </>
            );
            setIsDialogOpen(true);
          }
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  };

  let switchButtonTabs = [
    {
      id: '1',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.giaCertificate'
      ),
      url: `${FILE_URLS.CERT_FILE.replace(
        '***',
        sliderData[0]?.certificate_number ?? ''
      )}`,
    },

    {
      id: '2',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.diamondVideo'
      ),
      iframeUrl: `${FILE_URLS.VIDEO_FILE.replace(
        '***',
        sliderData[0]?.lot_id ?? ''
      )}`,
    },
    {
      id: '3',
      displayButtonLabel: ManageLocales(
        'app.searchResult.slider.diamondDetail.diamondImage'
      ),
      url: `${FILE_URLS.IMG.replace('***', sliderData[0]?.lot_id ?? '')}`,
    },
  ];

  const footerButtonData = [
    {
      id: 1,
      displayButtonLabel: (
        <CustomDropdown
          dropdownTrigger={
            <CustomDisplayButton
              displayButtonLabel={ManageLocales('app.searchResult.footer.more')}
              displayButtonAllStyle={{
                displayButtonStyle: styles.transparent,
              }}
            />
          }
          dropdownMenu={[
            {
              label: 'Share',
              fn: '',
            },
            {
              label: 'Download Excel',
              fn: () => downloadExcelFunction(),
            },
            {
              label: 'Find Matching Pair',
              fn: '',
            },
            {
              label: 'Compare Stone',
              fn: '',
            },
          ]}
        />
      ),
    },
    {
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
          setConfirmStoneData
        ),
    },
    {
      id: 3,
      displayButtonLabel: ManageLocales('app.searchResult.footer.addToCart'),
      style: styles.filled,
      fn: addToCart,
    },
  ];

  const handleRowClick = (row: any) => {
    handleCheckboxClick({
      id: row.id,
      isCheck,
      setIsCheck,
      setIsCheckAll,
      isCheckAll,
      data: tableRows,
      setIsError,
    });
  };

  const renderCellContent = (column: TableColumn, row: any, index: number) => {
    switch (column.accessor) {
      case 'details':
        return (
          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <DetailImageSlider
              dataTableBodyState={dataTableBodyState}
              dataTableBodySetState={dataTableBodySetState}
              tableRows={tableRows}
              index={index}
              switchButtonTabs={switchButtonTabs}
              row={row}
            />
            <DetailCertificateSlider
              dataTableBodyState={dataTableBodyState}
              dataTableBodySetState={dataTableBodySetState}
              row={row}
              tableRows={tableRows}
              index={index}
            />
          </div>
        );
      case 'lot_id':
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <DiamondDetailSlider
              dataTableBodyState={dataTableBodyState}
              dataTableBodySetState={dataTableBodySetState}
              tableRows={tableRows}
              index={index}
              switchButtonTabs={switchButtonTabs}
              row={row}
              column={column}
              footerButtonData={footerButtonData}
            />
          </div>
        );
      case 'lab':
        return (
          <a
            href={`${GIA_LINK}${row.rpt_number}`}
            target="_blank"
            className="border-b border-solitaireQuaternary border-solid"
            onClick={(e) => e.stopPropagation()}
          >
            {row[column.accessor] !== null ? row[column.accessor] : '-'}
          </a>
        );
      case 'amount':
        return row.variants[0].prices[0].amount;
      default:
        return row[column.accessor] !== null ? row[column.accessor] : '-';
    }
  };

  return (
    <tbody className={styles.tableBody}>
      {tableRows?.map((row: any, index: number) => (
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

          {tableCol?.map((column: TableColumn, tableColindex: number) => (
            <td
              style={{
                left: `${
                  tableColindex === 0 && selectionAllowed ? '45px' : '0px'
                }`,
                position: `${tableColindex === 0 ? 'sticky' : 'static'}`,
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
