"use client";
import React, { ChangeEvent, useMemo, useState } from "react";
import styles from "./previous-search.module.scss";
import { CustomTable } from "@components/common/table/table";
import { CustomDisplayButton } from "@components/common/buttons/display-button";
import EditIcon from "@public/assets/icons/edit.svg";
import CustomHeader from "@/components/common/header";
import { CustomCheckBox } from "@/components/common/checkbox";
import { SheetContent, SheetTrigger, Sheet } from "@/components/ui/sheet";
import CustomSearchResultCard from "@/components/common/search-result-card";
import { CustomFooter } from "@/components/common/footer";

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

  //checkbox states
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  //Search Bar States
  const [search, setSearch] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const searchData = ["R2.01VVS2 Search A", "R2.01VVS2 Searchb", "ooooo"];

  const searchList = useMemo(
    () => [
      {
        cardId: "1",
        header: "R2.01VVS2 Search A",
        desc: "12-05-2023 | 10.12 AM",
        body: {
          StoneShape: "Round",
          color: "D",
          Carat: "2.01",
          Clarity: "VVS2",
          Shade: "WHT",
          Cut: "EX",
          polish: "EX",
          Rap: "23,500.00",
        },
      },
      {
        cardId: "2",
        header: "R2.01VVS2 Searchb",
        desc: "12-05-2023 | 10.12 AM",
        body: {
          StoneShape: "Heart",
          color: "D",
          Carat: "2.01",
          Clarity: "VVS2",
          Shade: "WHT",
          Cut: "EX",
          polish: "EX",
          Rap: "23,500.00",
        },
      },
      {
        cardId: "2",
        header: "R2.01VVS2 Searchb",
        desc: "12-05-2023 | 10.12 AM",
        body: {
          StoneShape: "Heart",
          color: "D",
          Carat: "2.01",
          Clarity: "VVS2",
          Shade: "WHT",
          Cut: "EX",
          polish: "EX",
          Rap: "23,500.00",
        },
      },
      {
        cardId: "2",
        header: "R2.01VVS2 Searchb",
        desc: "12-05-2023 | 10.12 AM",
        body: {
          StoneShape: "Heart",
          color: "D",
          Carat: "2.01",
          Clarity: "VVS2",
          Shade: "WHT",
          Cut: "EX",
          polish: "EX",
          Rap: "23,500.00",
        },
      },
      {
        cardId: "2",
        header: "R2.01VVS2 Searchb",
        desc: "12-05-2023 | 10.12 AM",
        body: {
          StoneShape: "Heart",
          color: "D",
          Carat: "2.01",
          Clarity: "VVS2",
          Shade: "WHT",
          Cut: "EX",
          polish: "EX",
          Rap: "23,500.00",
        },
      },
      {
        cardId: "2",
        header: "R2.01VVS2 Searchb",
        desc: "12-05-2023 | 10.12 AM",
        body: {
          StoneShape: "Heart",
          color: "D",
          Carat: "2.01",
          Clarity: "VVS2",
          Shade: "WHT",
          Cut: "EX",
          polish: "EX",
          Rap: "23,500.00",
        },
      },
      {
        cardId: "2",
        header: "R2.01VVS2 Searchb",
        desc: "12-05-2023 | 10.12 AM",
        body: {
          StoneShape: "Heart",
          color: "D",
          Carat: "2.01",
          Clarity: "VVS2",
          Shade: "WHT",
          Cut: "EX",
          polish: "EX",
          Rap: "23,500.00",
        },
      },
    ],
    [] // No dependencies
  );
  const searchListNew = useMemo(
    () => [
      {
        cardId: "1",
        header: "ooooo",
        desc: "12-05-2023 | 10.12 AM",
        body: {
          StoneShape: "Round",
          color: "D",
          Carat: "2.01",
          Clarity: "VVS2",
          Shade: "WHT",
          Cut: "EX",
          polish: "EX",
          Rap: "23,500.00",
        },
      },
    ],
    [] // No dependencies
  );
  var cardData: any[] = [];

  const renderCardData = (data: any, suggestion: string) => {
    cardData = data
      .filter((data: any) =>
        data.header.toLowerCase().includes(suggestion.toLowerCase())
      )
      .map((data: any) => ({
        cardId: data.cardId,
        cardActionIcon: EditIcon,
        cardHeader: (
          <CustomTable
            tableData={{
              tableHeads: [data.header],
              bodyData: [{ desc: data.desc }],
            }}
            tableStyleClasses={searchCardTitle}
          />
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
      }));
  };

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
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    setSearch(inputValue);
    setSearchFilter("");

    // Filter data based on input value
    const filteredSuggestions = searchData.filter((item) =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );

    // Extract card titles from filtered suggestions
    const suggestionTitles = filteredSuggestions.map((item) => item);

    setSuggestions(suggestionTitles);

    // Update state with an array of strings
  };

  const handleSuggestionClick = (suggestion: any) => {
    setSearchFilter(suggestion);
    setSearch(suggestion);

    setSuggestions([]);

    let dataNew = searchList.map((data) => data.header);

    if (!dataNew.includes(suggestion)) {
      renderCardData(searchListNew, suggestion);
    }
    // Cledataar suggestions
  };
  //specific checkbox
  const handleClick = (e: any) => {
    const { id } = e.target;
    let value = e.target.getAttribute("data-state");
    setIsCheck([...isCheck, id]);
    if (value?.toLowerCase() === "checked") {
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
    { id: 1, displayButtonLabel: "Delete", style: styles.filled },
  ];
  renderCardData(searchList, searchFilter);

  //Header Data
  const headerData = {
    headerHeading: "Previous Search",
    handleSelectAllCheckbox: handleSelectAllCheckbox,
    searchCount: cardData.length,
    handleSearch: handleSearch,
    searchValue: search,
    handleSuggestionClick: handleSuggestionClick,
    suggestions: suggestions,
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
      <div className="container flex flex-col ">
        {/* Custom Header */}
        <div className="sticky top-0 bg-solitairePrimary mt-24">
          <CustomHeader data={headerData} />
        </div>

        <Sheet>
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
                      <SheetTrigger className={styles.mainCardContainer}>
                        <CustomSearchResultCard
                          cardData={items}
                          overriddenStyles={cardStyles}
                          defaultCardPosition={false}
                          handleCardAction={handleEdit}
                        />
                      </SheetTrigger>
                      <SheetContent className={styles.sheetContentStyle}>
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
                              {Object.entries(cardDetails.inclutionDetails).map(
                                ([key, value]) => (
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
            </>
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
