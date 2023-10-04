import React, { useEffect, useState } from 'react';
import { CustomCheckBox } from '../checkbox';
import { Checkbox } from '@/components/ui/checkbox';
import CustomPagination from '../pagination';
import Image from 'next/image';
import certficateOutline from '@public/assets/icons/ph_certificate-light.svg';
import imageOutline from '@public/assets/icons/image-outline.svg';
import styles from './custom-table.module.scss';
import { CustomSlider } from '../slider';
import { CustomDisplayButton } from '../buttons/display-button';
import { ManageLocales } from '@/utils/translate';

export interface Rows {
  id: string;
  stock_no: string;
  email: string;
  age: number;
  details: any;
  status: string;
  amount: number;
  discount: number;
}
interface ICustomDataTableProps {
  tableRows: any;
  tableColumns: any;
  checkboxData: any;
}

const CustomDataTable: React.FC<ICustomDataTableProps> = ({
  tableRows,
  tableColumns,
  checkboxData,
}) => {
  const [sliderData, setSliderData] = useState<Rows[]>([]);

  //pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(1); // You can set the initial value here
  const [numberOfPages, setNumberOfPages] = useState(0);

  const showResulutButtonStyle = {
    displayButtonStyle: styles.showResultButtonStyle,
  };

  // Function to handle "Show Results" button click
  const showButtonHandleClick = () => {
    alert("You have clicked the 'show result' button");
  };

  const handleResultsPerPageChange = (event: string) => {
    const newResultsPerPage = parseInt(event, 10);
    setResultsPerPage(newResultsPerPage);
    setCurrentPage(0); // Reset current page when changing results per page
  };

  const handlePageClick = (page: number) => {
    if (page >= 0 && page <= numberOfPages) {
      checkboxData.setIsCheck([]);
      checkboxData.setIsCheckAll(false);
      setCurrentPage(page);
    }
  };

  let optionLimits = [
    { id: 1, value: '1' },
    { id: 2, value: '10' },
  ];

  useEffect(() => {
    setNumberOfPages(2);
  }, []);

  return (
    <div className={''}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              {tableColumns.map((column: any) => (
                <th
                  key={column.accessor}
                  className={`${
                    column.accessor === 'status'
                      ? `${styles.tableHeadCS} ${styles.stickyStatus}`
                      : styles.tableHead
                  } ${
                    column.accessor === 'select'
                      ? `${styles.checkboxSticky} `
                      : ''
                  }`}
                >
                  {column.accessor === 'select' ? (
                    <div className={`flex text-center`}>
                      <Checkbox
                        onClick={checkboxData.handleSelectAllCheckbox}
                        data-testid={'Select All Checkbox'}
                        checked={checkboxData.isCheckAll}
                      />
                    </div>
                  ) : column.accessor !== 'status' ? (
                    column.label
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {tableRows.map((row: any, index: number) => (
              <tr key={row.id} className={styles.tableRow}>
                {tableColumns.map((column: any) => (
                  <td
                    key={`${row.id}-${column.accessor}`}
                    className={`${
                      column.accessor === 'status'
                        ? `${styles.tableDataCS} ${styles.stickyStatus}`
                        : styles.tableData
                    }  ${
                      row[column.accessor as keyof Rows] == 'A'
                        ? styles.availableStatus
                        : ''
                    }
                   ${
                     column.accessor === 'select'
                       ? `${styles.checkboxSticky} ${styles.checkboxStickyBg} `
                       : ''
                   }
                  `}
                  >
                    {column.accessor === 'select' ? (
                      <div className={`flex text-center`}>
                        <CustomCheckBox
                          data={row.id}
                          onClick={checkboxData.handleClick}
                          isChecked={checkboxData.isCheck}
                        />
                      </div>
                    ) : column.accessor === 'details' ? (
                      <div className="flex items-center gap-2">
                        <CustomSlider
                          sheetTriggerStyle={styles.mainCardContainer}
                          sheetTriggenContent={
                            <>
                              <div
                                onClick={() =>
                                  setSliderData([tableRows[index]])
                                }
                              >
                                <Image
                                  src={imageOutline}
                                  alt={`${row.details.gia} GIA Image`}
                                  width={20}
                                  height={20}
                                />
                              </div>
                            </>
                          }
                          sheetContentStyle={styles.sheetContentStyle}
                          sheetContent={
                            <>
                              <div className={styles.sheetMainHeading}>
                                <p>
                                  {ManageLocales('app.savedSearch.detailInfo')}
                                </p>
                              </div>

                              {sliderData.map((data) => {
                                return (
                                  <div key={data.id}>
                                    <Image
                                      src={data.details.gia}
                                      alt={data.details.gia}
                                      width={500}
                                      height={500}
                                    />
                                  </div>
                                );
                              })}

                              <div className="border-b border-solitaireTertiary mt-8"></div>

                              {/* Show Results button */}
                              <div className={styles.showResultMainDiv}>
                                <CustomDisplayButton
                                  displayButtonLabel="Show Results"
                                  displayButtonAllStyle={showResulutButtonStyle}
                                  handleClick={showButtonHandleClick}
                                />
                              </div>
                            </>
                          }
                        />
                        <CustomSlider
                          sheetTriggerStyle={styles.mainCardContainer}
                          sheetTriggenContent={
                            <>
                              <div
                                onClick={() =>
                                  setSliderData([tableRows[index]])
                                }
                              >
                                <Image
                                  src={certficateOutline}
                                  alt={`${row.details.stone} Stone Image`}
                                  width={20}
                                  height={20}
                                />
                              </div>
                            </>
                          }
                          sheetContentStyle={styles.sheetContentStyle}
                          sheetContent={
                            <>
                              <div className={styles.sheetMainHeading}>
                                <p>
                                  {ManageLocales('app.savedSearch.detailInfo')}
                                </p>
                              </div>

                              {sliderData.map((data) => {
                                return (
                                  <div key={data.id}>
                                    <Image
                                      src={data.details.stone}
                                      alt={data.details.stone}
                                      width={500}
                                      height={500}
                                    />
                                  </div>
                                );
                              })}
                              <div className="border-b border-solitaireTertiary mt-8"></div>

                              {/* Show Results button */}
                              <div className={styles.showResultMainDiv}>
                                <CustomDisplayButton
                                  displayButtonLabel="Show Results"
                                  displayButtonAllStyle={showResulutButtonStyle}
                                  handleClick={showButtonHandleClick}
                                />
                              </div>
                            </>
                          }
                        />
                      </div>
                    ) : column.accessor === 'stock_no' ? (
                      <CustomSlider
                        sheetTriggerStyle={styles.mainCardContainer}
                        sheetTriggenContent={
                          <>
                            <div
                              onClick={() => setSliderData([tableRows[index]])}
                              className={` ${
                                column.accessor === 'stock_no' && row.isMemoOut
                                  ? styles.memoOutBackground
                                  : 'px-[8px]'
                              }`}
                            >
                              {row[column.accessor as keyof Rows]}
                            </div>
                          </>
                        }
                        sheetContentStyle={styles.sheetContentStyle}
                        sheetContent={
                          <>
                            <div className={styles.sheetMainHeading}>
                              <p>
                                {ManageLocales('app.savedSearch.detailInfo')}
                              </p>
                            </div>

                            {sliderData.map((data) => {
                              return (
                                <div key={data.id}>
                                  <Image
                                    src={data.details.gia}
                                    alt={data.details.gia}
                                    width={500}
                                    height={500}
                                  />
                                  <div className="border-b border-solitaireTertiary mt-8"></div>
                                </div>
                              );
                            })}
                          </>
                        }
                      />
                    ) : (
                      row[column.accessor as keyof Rows]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex border-t-2 border-solitaireSenary items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-solitaireTertiary bg-solitaireSenary px-2 rounded-lg">
            xxxxxxx
          </span>
          <p className="text-solitaireTertiary text-sm">Memo - Out</p>
        </div>
        <CustomPagination
          currentPage={currentPage}
          totalPages={numberOfPages}
          resultsPerPage={resultsPerPage}
          optionLimits={optionLimits}
          handlePageClick={handlePageClick}
          handleResultsPerPageChange={handleResultsPerPageChange}
        />
      </div>
    </div>
  );
};

export default CustomDataTable;
