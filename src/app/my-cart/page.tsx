'use client';

import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { CustomCheckBox } from '@/components/common/checkbox';
import { CustomFooter } from '@/components/common/footer';
import CustomHeader from '@/components/common/header';
import CustomSearchResultCard from '@/components/common/search-result-card';
import { CustomTable } from '@/components/common/table';
import React, { useCallback, useEffect, useState } from 'react';
import ImageIcon from '@public/assets/icons/image-outline.svg';
import CertificateIcon from '@public/assets/icons/certificate.svg';
import Image from 'next/image';
import styles from './cart.module.scss';
import { Checkbox } from '@/components/ui/checkbox';
import { ManageLocales } from '@/utils/translate';
import { CustomSlider } from '@/components/common/slider';
import { useRouter } from 'next/navigation';
import { useDeleteCartMutation, useGetCartQuery } from '@/features/api/cart';
import { formatCreatedAt } from '@/utils/format-date';
import { CustomDropdown } from '@/components/common/dropdown';
import { useAppDispatch } from '@/hooks/hook';
import { addCompareStone } from '@/features/compare-stone/compare-stone-slice';

interface KeyLabelMapping {
  [key: string]: string;
}

const MyCart = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // Style classes and variables
  const tableStyles = {
    tableHeaderStyle: styles.tableHeader,
    tableBodyStyle: styles.tableBody,
  };
  const cardStyles = {
    cardContainerStyle: styles.searchCardContainer,
  };
  const showResulutButtonStyle = {
    displayButtonStyle: styles.showResultButtonStyle,
  };
  const cardTimeStyles = {
    displayButtonStyle: styles.remainingCartTimeButton,
    displayLabelStyle: styles.remainingCartTimeLabel,
  };

  //checkbox states
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [createdAt, setCreateAt] = useState('');

  const { data } = useGetCartQuery({});
  const [deleteCart, { isLoading: updateIsLoading, isError: updateIsError }] =
    useDeleteCartMutation();

  const [remainingTime, setRemainingTime] = useState([]);

  function calculateRemainingTime(createdAt: any) {
    let millisecondData = createdAt.map((items: any) => {
      const createdAtTime = new Date(items).getTime(); // Convert created at to milliseconds since epoch
      const now = new Date().getTime(); // Current time in milliseconds
      const thirtyMinutesInMilliseconds = 30 * 60 * 1000; // 30 minutes in milliseconds

      const remainingTimea =
        thirtyMinutesInMilliseconds - (now - createdAtTime);

      return remainingTimea;
    });

    return millisecondData;
  }

  const keyLabelMapping: KeyLabelMapping = {
    shape: 'Shape',
    carat: 'Carat',
    color: 'Color',
    clarity: 'Clarity',
    color_shade: 'Shade',
    cut: 'Cut',
    polish: 'Polish',
    symmetry: 'Symmetry',
    rap: 'Rap($)',
    lab: 'Lab',
    inscription: 'Ins.',
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedRemainingTime = calculateRemainingTime(createdAt).map(
        (item: any) => {
          if (item <= 0) {
            return false;
          }
          return item;
        }
      );

      setRemainingTime(updatedRemainingTime);

      if (updatedRemainingTime.some((item: any) => item <= 0)) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [createdAt, remainingTime]);

  const renderCardData = useCallback(
    (data: any) => {
      const createdAtArray: any = [];
      return data.map((data: any, index: number) => {
        createdAtArray.push(data.created_at);

        setCreateAt(createdAtArray);

        let timeData = remainingTime.map((items: any) => {
          if (items <= 0) {
            return true;
          } else {
            let remainingMinutes = Math.min(Math.floor(items / 60000), 29);
            let remainingSeconds = Math.floor((items % 60000) / 1000);
            return `Buy within ${remainingMinutes} min ${remainingSeconds} secs`;
          }
        });

        const filteredData: any = {};

        for (const key in keyLabelMapping) {
          const dataKey = keyLabelMapping[key];
          if (data.product[key] !== undefined) {
            filteredData[dataKey] = data.product[key] ? data.product[key] : '-';
          }
        }

        return {
          cardId: data.id,
          cardTimeOut: typeof timeData[index] === 'string' ? false : true,
          cardHeader: (
            <div className={styles.cardHeaderMainDiv}>
              <div className={styles.searchHeader}>
                <Image
                  src={ImageIcon}
                  alt="ImageIcon"
                  className={styles.headerIconStyle}
                  onClick={(e) => handleImageButton(e)}
                />
                <Image
                  src={CertificateIcon}
                  alt="CertificateIcon"
                  className={styles.headerIconStyle}
                  onClick={(e) => handleCertificateButton(e)}
                />
                <p className={styles.SearchDateTime}>
                  {formatCreatedAt(data.created_at)}
                </p>
              </div>
              <div>
                {data.created_at && (
                  <CustomDisplayButton
                    displayButtonAllStyle={cardTimeStyles}
                    displayButtonLabel={!timeData ? '' : timeData[index]}
                  />
                )}
              </div>
            </div>
          ),
          cardContent: (
            <CustomTable
              tableData={{
                tableHeads: Object.keys(keyLabelMapping).map(
                  (key) => keyLabelMapping[key]
                ),
                bodyData: [filteredData],
              }}
              tableStyleClasses={tableStyles}
            />
          ),
          unBlurHeader: (
            <p
              className={`${styles.SearchCardTitle} ${styles.unBlurCardHeader}`}
            >
              <span className={styles.rptNoStyle}>RPT No. </span>
              {data.product.rpt_number}
            </p>
          ),
        };
      });
    },
    [remainingTime, createdAt]
  );

  useEffect(() => {
    if (data) {
      setCardData(renderCardData(data.items));
    }
  }, [data, remainingTime]);

  const cardDetailData = [
    {
      cardId: 1,
      basicCardDetails: {
        Lab: 'GIA',
        Shape: 'Round',
        Carat: '2,2.5,3',
        Color: 'D,E,F',
        Clarity: 'FL,VVS1,VVS2',
        Tinge: 'WH',
        Cut: 'EX,VG,G',
        Polish: 'EX',
        Symmetry: 'EX',
        Fluorescene: 'Non',
        Location: 'IND',
      },

      inclutionDetails: {
        'Table Black': 'BO',
        'Side Black': 'SBO',
        'Table Inclution': 'TO',
        'Side Inclution': 'SO',
        'Table Open': 'N',
        'Crown Open': 'N',
        'Pavillion Open': 'N',
        'Eye Clean': 'Y',
        'Hearts & Arrows': '-',
        Brilliancy: '-',
        'Type 2 Certificate': '-',
        'Country Of Origin': '-',
        'Rough Mine': '-',
        'Natural Girdle': 'N',
        'Natural Crown': 'N',
        'Natural Pavillion': 'N',
        'Internal Graining': 'IGO',
        'Surface Graining': 'GO',
      },

      measurements: {
        Girdle: 'Med-Stk',
        Cutlet: 'None',
        Luster: 'EX',
      },

      OtherInformation: {
        'Key To Symbol': '-',
        'Report Comments': '-',
      },
    },
  ];

  //specific checkbox
  const handleClick = (id: string) => {
    let updatedIsCheck = [...isCheck];

    if (updatedIsCheck.includes(id)) {
      updatedIsCheck = updatedIsCheck.filter((item) => item !== id);
    } else {
      updatedIsCheck.push(id);
    }

    setIsCheck(updatedIsCheck);

    if (updatedIsCheck.length === cardData?.length) {
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
    setIsCheck(cardData?.map((li: any) => li.cardId));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleDelete = () => {
    deleteCart({
      items: isCheck,
    })
      .unwrap()
      .then((data) => {
        setCardData(data.items);
      })
      .catch(() => {
        console.log('1111111111111111');
      });
  };

  const handleCompareStone = () => {
    const maxStones = 10;
    const minStones = 2;

    if (isCheck.length > maxStones) {
      setIsError(true);
      setErrorText(`You can compare a maximum of ${maxStones} stones`);
    } else if (isCheck.length < minStones) {
      setIsError(true);
      setErrorText(`Minimum ${minStones} stones are required to compare`);
    } else {
      const compareStones = isCheck
        .map((id) => data.items.find((row: any) => row.id === id))
        .map((stone) => stone.product);

      dispatch(addCompareStone(compareStones));
      router.push('/compare-stone');
    }
  };

  //Footer Button Data
  const footerButtonData = [
    {
      id: 1,
      displayButtonLabel: (
        <CustomDropdown
          dropdownTrigger={
            <CustomDisplayButton
              displayButtonLabel={ManageLocales('app.searchResult.footer.more')}
            />
          }
          dropdownMenu={[
            {
              label: 'Share',
              fn: '',
            },
            {
              label: 'Download Excel',
              fn: '',
            },
            {
              label: 'Find Matching Pair',
              fn: '',
            },
          ]}
        />
      ),
    },
    {
      id: 2,
      displayButtonLabel: 'Compare Stone',
      style: styles.transparent,
      fn: handleCompareStone,
    },
    {
      id: 2,
      displayButtonLabel: 'Delete',
      style: styles.transparent,
      fn: handleDelete,
    },
    { id: 3, displayButtonLabel: 'Confirm Stone', style: styles.filled },
  ];

  //Header Data
  const headerData = {
    headerHeading: 'MyCart',
    searchCount: cardData?.length,
    headerData: (
      <div className="flex items-center gap-[10px] bottom-0">
        <Checkbox
          onClick={handleSelectAllCheckbox}
          data-testid={'Select All Checkbox'}
          checked={isCheckAll}
        />
        <p className="text-solitaireTertiary text-base font-medium">
          {ManageLocales('app.common.header.selectAll')}
        </p>
      </div>
    ),
    overriddenStyles: {
      headerDataStyles: 'flex items-end',
    },
  };

  // Function to handle edit action
  const handleEdit = (stone: string) => {
    alert("You have clicked the 'Edit button'");
  };

  // Function to handle "Show Results" button click
  const showButtonHandleClick = () => {
    alert("You have clicked the 'show result' button");
  };

  const handleImageButton = (event: any) => {
    event.stopPropagation();
    alert('Click on Image Button');
  };

  const handleCertificateButton = (event: any) => {
    event.stopPropagation();
    alert('Click on Certificate Button');
  };

  const handleBlurFunction = () => {
    router.push('/wishlist');
  };

  return (
    <>
      <div className="container flex flex-col ">
        {/* Custom Header */}
        <div className="sticky top-0 bg-solitairePrimary mt-16">
          <CustomHeader data={headerData} />
        </div>

        {/* Custom Card and Checkbox map */}
        <div className="flex-grow overflow-y-auto min-h-[80vh]">
          <>
            {cardData?.map((items: any) => {
              return (
                <div key={items.cardId}>
                  <div className="flex mt-6">
                    <CustomCheckBox
                      data={items.cardId}
                      onClick={handleClick}
                      isChecked={isCheck}
                    />
                    <CustomSlider
                      sheetTriggenContent={
                        <>
                          <CustomSearchResultCard
                            cardData={items}
                            overriddenStyles={cardStyles}
                            handleCardAction={handleEdit}
                            isBlur={items.cardTimeOut}
                            blurContent={
                              <>
                                <p>Your stone has been moved to wishlist</p>
                                <CustomDisplayButton
                                  displayButtonLabel="Wishlist"
                                  handleClick={handleBlurFunction}
                                  displayButtonAllStyle={{
                                    displayButtonStyle: styles.filled,
                                    displayLabelStyle:
                                      styles.ViewSimilarStoneLabel,
                                  }}
                                />
                              </>
                            }
                          />
                        </>
                      }
                      sheetTriggerStyle={styles.mainCardContainer}
                      sheetContent={
                        <>
                          {/* Detailed Information section */}
                          <div
                            className={`border-b border-solitaireTertiary ${styles.sheetMainHeading}`}
                          >
                            <p>Detailed Information</p>
                          </div>
                          {/* Loop through card detail data */}
                          {cardDetailData.map((cardDetails) => (
                            <div className="flex" key={cardDetails.cardId}>
                              <div className={styles.sheetMainDiv}>
                                <div className={styles.sheetHeading}>
                                  <p>Basic Details</p>
                                </div>

                                <div>
                                  {Object.entries(
                                    cardDetails.basicCardDetails
                                  ).map(([key, value]) => (
                                    <div key={key}>
                                      <p className="flex">
                                        <span className={styles.innerHeading}>
                                          {key}
                                        </span>
                                        <span className={styles.sheetValues}>
                                          {value}
                                        </span>
                                      </p>
                                    </div>
                                  ))}
                                </div>

                                <div className={styles.sheetHeading}>
                                  <p>Measurements</p>
                                </div>

                                <div>
                                  {Object.entries(cardDetails.measurements).map(
                                    ([key, value]) => (
                                      <div key={key}>
                                        <p className="flex">
                                          <span className={styles.innerHeading}>
                                            {key}
                                          </span>
                                          <span className={styles.sheetValues}>
                                            {value}
                                          </span>
                                        </p>
                                      </div>
                                    )
                                  )}
                                </div>

                                <div className={styles.sheetHeading}>
                                  <p>Other Information</p>
                                </div>

                                <div>
                                  {Object.entries(
                                    cardDetails.OtherInformation
                                  ).map(([key, value]) => (
                                    <div key={key}>
                                      <p className="flex">
                                        <span className={styles.innerHeading}>
                                          {key}
                                        </span>
                                        <span className={styles.sheetValues}>
                                          {value}
                                        </span>
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className={styles.inclusionDetailsMainDiv}>
                                <div className={styles.sheetHeading}>
                                  <p>Inclusion Details</p>
                                </div>
                                {Object.entries(
                                  cardDetails.inclutionDetails
                                ).map(([key, value]) => (
                                  <p className="flex" key={key}>
                                    <span
                                      className={
                                        styles.inclutionDetailsInnerHeadingStyle
                                      }
                                    >
                                      {key}
                                    </span>
                                    <span className={styles.sheetValues}>
                                      {value}
                                    </span>
                                  </p>
                                ))}
                              </div>
                            </div>
                          ))}
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
                      sheetContentStyle={styles.sheetContentStyle}
                      cardTimeout={items.cardTimeOut}
                    />
                  </div>
                </div>
              );
            })}
          </>
        </div>

        {/* Custom Footer */}
        {footerButtonData?.length && (
          <div className="sticky bottom-0 bg-solitairePrimary mt-3 flex border-t-2 border-solitaireSenary items-center justify-between">
            {isError && (
              <div className="w-[30%]">
                <p className="text-red-700 text-base ">{errorText}</p>
              </div>
            )}
            <CustomFooter footerButtonData={footerButtonData} />
          </div>
        )}
      </div>
    </>
  );
};

export default MyCart;
