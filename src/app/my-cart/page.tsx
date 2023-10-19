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

interface KeyLabelMapping {
  [key: string]: string;
}

const MyCart = () => {
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

  const { data } = useGetCartQuery({});
  const [deleteCart, { isLoading: updateIsLoading, isError: updateIsError }] =
    useDeleteCartMutation();

  function calculateRemainingTime(createdAt: string) {
    const createdAtTime = new Date(createdAt).getTime(); // Convert created at to milliseconds since epoch
    const now = new Date().getTime(); // Current time in milliseconds
    const thirtyMinutesInMilliseconds = 30 * 60 * 1000; // 30 minutes in milliseconds

    const remainingTime = thirtyMinutesInMilliseconds - (now - createdAtTime);

    if (remainingTime <= 0) {
      return false;
    } else {
      // Limit the remaining time to a maximum of 30 minutes
      const remainingMinutes = Math.min(Math.floor(remainingTime / 60000), 29);
      const remainingSeconds = Math.floor((remainingTime % 60000) / 1000);
      return `Buy within ${remainingMinutes} min ${remainingSeconds} secs`;
    }
  }

  const keyLabelMapping: KeyLabelMapping = {
    shape: 'Shape',
    color: 'Color',
    carat: 'Carat',
    clarity: 'Clarity',
    color_shade: 'Shade',
    cut: 'Cut',
    polish: 'Polish',
    rap: 'Rap($)',
    crown_angle: 'C/A',
    crown_height: 'C/H',
    symmetry: 'Symmetry',
    length: 'Length',
    width: 'Width',
    lab: 'Lab',
    girdle: 'Girdle',
    culet: 'Culet',
    inscription: 'Ins.',
    origin_country: 'Origin',
    luster: 'Luster',
    depth: 'Depth',
  };

  const renderCardData = useCallback((data: any) => {
    return data.map((data: any) => {
      let timeData = calculateRemainingTime(data.created_at);

      const filteredData: any = {};

      for (const key in keyLabelMapping) {
        const dataKey = keyLabelMapping[key];
        if (data.product[key] !== undefined) {
          filteredData[dataKey] = data.product[key] ? data.product[key] : '-';
        }
      }

      return {
        cardId: data.id,
        cardTimeOut: !timeData ? true : false,
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
                  displayButtonLabel={!timeData ? '' : timeData}
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
          <p className={`${styles.SearchCardTitle} ${styles.unBlurCardHeader}`}>
            <span className={styles.rptNoStyle}>RPT No. </span>
            {data.product.rpt_number}
          </p>
        ),
      };
    });
  }, []);

  useEffect(() => {
    if (data) {
      setCardData(renderCardData(data.items));
    }
  }, [data]);

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
    deleteCart(isCheck);
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
          <div className="sticky bottom-0 bg-solitairePrimary mt-3">
            <CustomFooter footerButtonData={footerButtonData} />
          </div>
        )}
      </div>
    </>
  );
};

export default MyCart;
