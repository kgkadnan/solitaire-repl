"use client";

import React, { useState } from "react";
import styles from "./previous-search.module.scss";
import EditIcon from "@public/assets/icons/edit.svg";
import { CustomTable } from "@components/common/table/table";
import { CustomCheckBox } from "@/components/common/checkbox";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CustomSearchResultCard from "@/components/common/search-result-card";
import { CustomFooter } from "@/components/common/footer";
import CustomHeader from "@/components/common/header";
import { CustomDisplayButton } from "@/components/common/buttons/display-button";
import { ToggleButton } from "@/components/common/toggle";

// PreviousSearch component definition
const PreviousSearch = () => {
  // Style classes and variables
  const tableStyles = {
    tableHeaderStyle: styles.tableHeader,
    tableBodyStyle: styles.tableBody,
  };
  const searchCardTitle = {
    tableHeaderStyle: styles.SearchCardTitle,
    tableBodyStyle: styles.SearchDateTime,
  };
  const cardStyles = {
    cardContainerStyle: styles.searchCardContainer,
  };
  const showResulutButtonStyle = {
    displayButtonStyle: styles.showResultButtonStyle,
  };

  // Sample data for tables and cards
  const tableData = {
    tableHeads: [
      "Stone shape",
      "Color",
      "Carat",
      "Clarity",
      "Shade",
      "Cut",
      "polish",
      "Rap($)",
    ],
    bodyData: [
      {
        StoneShape: "Round",
        color: "D",
        Carat: "2.01",
        Clarity: "VVS2",
        Shade: "WHT",
        Cut: "EX",
        polish: "EX",
        Rap: "23,500.00",
      },
    ],
  };
  const searchCardTitleData = {
    tableHeads: ["R2.01VVS2 Search A"],
    bodyData: [
      {
        StoneShape: "12-05-2023 | 10.12 AM",
      },
    ],
  };
  const cardData = [
    {
      cardId: "1",
      cardActionIcon: EditIcon,
      cardHeader: (
        <CustomTable
          tableData={searchCardTitleData}
          tableStyleClasses={searchCardTitle}
        />
      ),
      cardContent: (
        <CustomTable tableData={tableData} tableStyleClasses={tableStyles} />
      ),
    },
    {
      cardId: "2",
      cardActionIcon: EditIcon,
      cardHeader: (
        <CustomTable
          tableData={searchCardTitleData}
          tableStyleClasses={searchCardTitle}
        />
      ),
      cardContent: (
        <CustomTable tableData={tableData} tableStyleClasses={tableStyles} />
      ),
    },
    {
      cardId: "3",
      cardActionIcon: EditIcon,
      cardHeader: (
        <CustomTable
          tableData={searchCardTitleData}
          tableStyleClasses={searchCardTitle}
        />
      ),
      cardContent: (
        <CustomTable tableData={tableData} tableStyleClasses={tableStyles} />
      ),
    },
    {
      cardId: "4",
      cardActionIcon: EditIcon,
      cardHeader: (
        <CustomTable
          tableData={searchCardTitleData}
          tableStyleClasses={searchCardTitle}
        />
      ),
      cardContent: (
        <CustomTable tableData={tableData} tableStyleClasses={tableStyles} />
      ),
    },
  ];
  const cardDetailData = [
    {
      cardId: 1,
      basicCardDetails: {
        Lab: "GIA",
        Shape: "Round",
        Carat: "2,2.5,3",
        Color: "D,E,F",
        Clarity: "FL,VVS1,VVS2",
        Tinge: "WH",
        Cut: "EX,VG,G",
        Polish: "EX",
        Symmetry: "EX",
        Fluorescene: "Non",
        Location: "IND",
      },

      inclutionDetails: {
        "Table Black": "BO",
        "Side Black": "SBO",
        "Table Inclution": "TO",
        "Side Inclution": "SO",
        "Table Open": "N",
        "Crown Open": "N",
        "Pavillion Open": "N",
        "Eye Clean": "Y",
        "Hearts & Arrows": "-",
        Brilliancy: "-",
        "Type 2 Certificate": "-",
        "Country Of Origin": "-",
        "Rough Mine": "-",
        "Natural Girdle": "N",
        "Natural Crown": "N",
        "Natural Pavillion": "N",
        "Internal Graining": "IGO",
        "Surface Graining": "GO",
      },

      measurements: {
        Girdle: "Med-Stk",
        Cutlet: "None",
        Luster: "EX",
      },

      OtherInformation: {
        "Key To Symbol": "-",
        "Report Comments": "-",
      },
    },
  ];

  //Footer Button Data
  const footerButtonData = [
    { id: 4, displayButtonLabel: "Delete", style: styles.filled },
  ];

  // State for checkbox selection
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  // Function for handling individual checkbox selection
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    let value = e.target.getAttribute("data-state");
    setIsCheck([...isCheck, id]);
    if (value?.toLowerCase() === "checked") {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  // Function for handling "Select All" checkbox
  const handleSelectAllCheckbox = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(cardData.map((li) => li.cardId));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  // Function to handle edit action
  const handleEdit = (stone: string) => {
    alert("You have clicked the 'Edit button'");
  };

  // Function to handle "Show Results" button click
  const showButtonHandleClick = () => {
    alert("You have clicked the 'show result' button");
  };

  return (
    <>
      <ToggleButton />
      <div className="container min-h-screen flex flex-col ">
        {/* Custom Header */}
        <div className="sticky top-0 bg-solitairePrimary mt-3">
          <CustomHeader
            handleSelectAllCheckbox={handleSelectAllCheckbox}
            searchCount={cardData.length}
            heading="Previous Search"
          />
        </div>

        <Sheet>
          {/* Custom Card and Checkbox map */}
          <div className="flex-grow overflow-y-auto">
            {cardData.map((items) => {
              return (
                <div key={items.cardId}>
                  <div className="flex mt-6">
                    <CustomCheckBox
                      data={items.cardId}
                      onClick={handleClick}
                      isChecked={isCheck}
                    />
                    <SheetTrigger className={styles.mainCardContainer}>
                      <CustomSearchResultCard
                        cardData={items}
                        overriddenStyles={cardStyles}
                        defaultCardPosition={false}
                        handleCardAction={handleEdit}
                      />
                    </SheetTrigger>
                    <SheetContent>
                      {/* Detailed Information section */}
                      <div
                        className={`border-b border-solitaireTertiary ${styles.sheetMainHeading}`}
                      >
                        <p>Detailed Information</p>
                      </div>

                      {/* Loop through card detail data */}
                      {cardDetailData.map((cardDetails) => (
                        <div className="flex">
                          <div className={styles.sheetMainDiv}>
                            <div className={styles.sheetHeading}>
                              <p>Basic Details</p>
                            </div>

                            <div>
                              {Object.entries(cardDetails.basicCardDetails).map(
                                ([key, value]) => (
                                  <div>
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
                              {Object.entries(cardDetails.OtherInformation).map(
                                ([key, value]) => (
                                  <div>
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
                          </div>

                          <div className={styles.inclusionDetailsMainDiv}>
                            <div className={styles.sheetHeading}>
                              <p>Inclusion Details</p>
                            </div>
                            {Object.entries(cardDetails.inclutionDetails).map(
                              ([key, value]) => (
                                <p className="flex">
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
                              )
                            )}
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
                    </SheetContent>
                  </div>
                </div>
              );
            })}
          </div>
        </Sheet>
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

export default PreviousSearch;
