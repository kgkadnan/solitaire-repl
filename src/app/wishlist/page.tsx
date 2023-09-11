'use client';
import React, { useState } from 'react';
import { CustomTable } from '@/components/common/table';
import { CustomDisplayButton } from '@components/common/buttons/display-button';
import CustomHeader from '@/components/common/header';
import { CustomCheckBox } from '@/components/common/checkbox';
import CustomSearchResultCard from '@/components/common/search-result-card';
import { CustomFooter } from '@/components/common/footer';
import ImageIcon from '@public/assets/icons/image-outline.svg';
import CertificateIcon from '@public/assets/icons/certificate.svg';
import Image from 'next/image';
import styles from './wishlist.module.scss';
import { CustomSlider } from '@/components/common/slider';
import { useRouter } from 'next/navigation';

const WishList = () => {
  const router = useRouter();
  // Style classes and variables
  const tableStyles = {
    tableHeaderStyle: styles.tableHeader,
    tableBodyStyle: styles.tableBody,
    tableStyle: styles.tableStyle,
  };

  const cardStyles = {
    cardContainerStyle: styles.searchCardContainer,
  };
  const showResulutButtonStyle = {
    displayButtonStyle: styles.showResultButtonStyle,
  };

  const memoButtonStyle = {
    displayButtonStyle: styles.memoButton,
    displayLabelStyle: styles.memoButtonLabel,
  };

  //checkbox states
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  const searchList = [
    {
      cardId: '1',
      header: '454648543',
      desc: '12-05-2023 | 10.12 AM',
      cardTimeOut: false,
      body: {
        color: 'D',
        Carat: '2.01',
        Clarity: 'VVS2',
        Shade: 'WHT',
        Cut: 'EX',
        polish: 'EX',
        Rap: '23,500.00',
        'C/A': '59',
        'C/H': '15.6',
        Symmetry: 'EX',
        Length: '80.4',
        Width: '7.98',
        Lab: 'GIA',
        Girdle: 'Med-Stk',
        Cutlet: 'None',
        Ins: 'Yes',
        Origin: 'IND',
        Luster: 'EX',
        Depth: 'IND',
      },
    },
    {
      cardId: '2',
      header: '454648543',
      desc: '12-05-2023 | 10.12 AM',
      cardTimeOut: true,
      body: {
        color: 'D',
        Carat: '2.01',
        Clarity: 'VVS2',
        Shade: 'WHT',
        Cut: 'EX',
        polish: 'EX',
        Rap: '23,500.00',
        'C/A': '59',
        'C/H': '15.6',
        Symmetry: 'EX',
        Length: '80.4',
        Width: '7.98',
        Lab: 'GIA',
        Girdle: 'Med-Stk',
        Cutlet: 'None',
        Ins: 'Yes',
        Origin: 'IND',
        Luster: 'EX',
        Depth: 'IND',
      },
    },
  ];

  let cardData: any[] = [];

  cardData = searchList.map((data: any) => ({
    cardId: data.cardId,
    cardTimeOut: data.cardTimeOut,
    cardHeader: (
      <div className={styles.wishlistHeaderMainDiv}>
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
          <p className={styles.SearchDateTime}>{data.desc}</p>
        </div>
        <div>
          <CustomDisplayButton
            displayButtonAllStyle={memoButtonStyle}
            displayButtonLabel={'Moved Out'}
          />
        </div>
      </div>
    ),
    cardContent: (
      <CustomTable
        tableData={{
          tableHeads: Object.keys(data.body),
          bodyData: [data.body],
        }}
        tableStyleClasses={tableStyles}
      />
    ),
    unBlurHeader: (
      <p className={`${styles.SearchCardTitle} ${styles.unBlurCardHeader}`}>
        <span className={styles.rptNoStyle}>RPT No. </span>
        {data.header}
      </p>
    ),
  }));

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
  const handleClick = (e: any) => {
    const { id } = e.target;
    let value = e.target.getAttribute('data-state');
    setIsCheck([...isCheck, id]);
    if (value?.toLowerCase() === 'checked') {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  //Selecting All Checkbox Function
  const handleSelectAllCheckbox = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(cardData.map((li) => li.cardId));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  //Footer Button Data
  const footerButtonData = [
    { id: 1, displayButtonLabel: 'Compare Stone', style: styles.transparent },
    { id: 2, displayButtonLabel: 'Delete', style: styles.filled },
    { id: 3, displayButtonLabel: 'Add to Cart', style: styles.filled },
  ];

  //Header Data
  const headerData = {
    headerHeading: 'Wishlist',
    handleSelectAllCheckbox: handleSelectAllCheckbox,
    searchCount: cardData.length,
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
    router.push('/');
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
                                <p>Out of Stock</p>
                                <CustomDisplayButton
                                  displayButtonLabel="View Similar Stone"
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
                      sheetTriggerStyle={styles.mainCardContainer}
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

export default WishList;
