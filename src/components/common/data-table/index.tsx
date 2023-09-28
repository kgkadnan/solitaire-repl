import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
  image: any;
  status: string;
}
interface ICustomDataTableProps {
  tableRows: any;
  tableColumns: any;
}

const CustomDataTable: React.FC<ICustomDataTableProps> = ({
  tableRows,
  tableColumns,
}) => {
  console.log('tableRows', tableRows);
  const [sliderData, setSliderData] = useState<Rows[]>([]);
  const showResulutButtonStyle = {
    displayButtonStyle: styles.showResultButtonStyle,
  };

  // Function to handle "Show Results" button click
  const showButtonHandleClick = () => {
    alert("You have clicked the 'show result' button");
  };

  //checkbox states
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  //pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(1); // You can set the initial value here
  const [numberOfPages, setNumberOfPages] = useState(0);

  const handleResultsPerPageChange = (event: string) => {
    const newResultsPerPage = parseInt(event, 10);
    setResultsPerPage(newResultsPerPage);
    setCurrentPage(0); // Reset current page when changing results per page
  };

  const handlePageClick = (page: number) => {
    if (page >= 0 && page <= numberOfPages) {
      setIsCheck([]);
      setIsCheckAll(false);
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

  //specific checkbox
  const handleClick = (e: any) => {
    const { id } = e.target;

    let updatedIsCheck = [...isCheck];

    if (updatedIsCheck.includes(id)) {
      updatedIsCheck = updatedIsCheck.filter((item) => item !== id);
    } else {
      updatedIsCheck.push(id);
    }

    setIsCheck(updatedIsCheck);

    if (updatedIsCheck.length === tableRows?.length) {
      setIsCheckAll(true);
    } else {
      setIsCheckAll(false);
    }
    if (isCheckAll) {
      setIsCheckAll(false);
    }
  };

  //Selecting All Checkbox Function
  const handleSelectAllCheckbox = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(tableRows?.map((li: any) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  return (
    <div className={''}>
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
                        ? styles.tableHeadCS
                        : styles.tableHead
                    }`}
                  >
                    {column.accessor === 'select' ? (
                      <Checkbox
                        onClick={handleSelectAllCheckbox}
                        data-testid={'Select All Checkbox'}
                        checked={isCheckAll}
                      />
                    ) : (
                      column.accessor !== 'status' && column.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {tableRows.map(
                (row: any, index: number) => (
                  console.log('rows', row),
                  (
                    <tr key={row.id} className={styles.tableRow}>
                      {tableColumns.map((column: any) => (
                        <td
                          key={`${row.id}-${column.accessor}`}
                          className={`${
                            column.accessor === 'status'
                              ? styles.tableDataCS
                              : styles.tableData
                          }  ${
                            row[column.accessor as keyof Rows] == 'A'
                              ? styles.availableStatus
                              : ''
                          }`}
                        >
                          {column.accessor === 'select' ? (
                            <CustomCheckBox
                              style={styles.customCheckboxStyle}
                              data={row.id}
                              onClick={handleClick}
                              isChecked={isCheck}
                            />
                          ) : column.accessor === 'image' ? (
                            <div className="flex items-center">
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
                                        alt={`${row.image.gia} GIA Image`}
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
                                        {ManageLocales(
                                          'app.savedSearch.detailInfo'
                                        )}
                                      </p>
                                    </div>

                                    {sliderData.map((data) => {
                                      return (
                                        <div key={data.id}>
                                          <Image
                                            src={data.image.gia}
                                            alt={data.image.gia}
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
                                        displayButtonAllStyle={
                                          showResulutButtonStyle
                                        }
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
                                        alt={`${row.image.stone} Stone Image`}
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
                                        {ManageLocales(
                                          'app.savedSearch.detailInfo'
                                        )}
                                      </p>
                                    </div>

                                    {sliderData.map((data) => {
                                      return (
                                        <div key={data.id}>
                                          <Image
                                            src={data.image.stone}
                                            alt={data.image.stone}
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
                                        displayButtonAllStyle={
                                          showResulutButtonStyle
                                        }
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
                                    onClick={() =>
                                      setSliderData([tableRows[index]])
                                    }
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
                                      {ManageLocales(
                                        'app.savedSearch.detailInfo'
                                      )}
                                    </p>
                                  </div>

                                  {sliderData.map((data) => {
                                    return (
                                      <div key={data.id}>
                                        <Image
                                          src={data.image.gia}
                                          alt={data.image.gia}
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
                                      displayButtonAllStyle={
                                        showResulutButtonStyle
                                      }
                                      handleClick={showButtonHandleClick}
                                    />
                                  </div>
                                </>
                              }
                            />
                          ) : (
                            row[column.accessor as keyof Rows]
                          )}
                        </td>
                      ))}
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
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
  );
};

export default CustomDataTable;
