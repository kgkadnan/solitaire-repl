"use client";
import { CustomSearchCard } from "@components/common/search-card";
import React, { useState } from "react";
import styles from "./saved-search.module.scss";
import { CustomTable } from "@components/common/table/table";
import { CustomDisplayButton } from "@components/common/buttons/display-button";
import EditIcon from "@public/assets/icons/edit.svg";

const SavedSearch = () => {
  // Style classes and variables
  const displayButtonStyles = {
    displayLabelStyle: styles.SearchButtonLabel,
    displayButtonStyle: styles.SearchButtonStyle,
  };
  const tableStyles = {
    tableHeaderStyle: styles.tableHeader,
    tableBodyStyle: styles.tableBody,
  };
  const cardStyles = {
    cardContainerStyle: styles.searchCardContainer,
  };

  const data = ["Apple", "Banana", "Cherry", "Grape", "Orange", "Pineapple"];

  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearch = (e: any) => {
    let inputValue = e.target.value;
    setSearch(inputValue);

    // Filter data based on input value
    const filteredSuggestions = data.filter((item) =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion: any) => {
    setSearch(suggestion);
    setSuggestions([]); // Clear suggestions
  };

  // Sample Table data
  const tableData = {
    tableHeads: [
      "Stone shape",
      "color",
      "Carat",
      "Clarity",
      "Shade",
      "Cut",
      "polish",
      "Rap($)",
      "C/A",
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
        CA: "59.00",
      },
    ],
  };

  //checkbox states
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  //Card Content
  const cardData = [
    {
      cardId: "1",
      cardActionIcon: EditIcon,
      cardHeader: (
        <div className={styles.headerContainer}>
          <div className={styles.searchHeader}>
            <p className={styles.SearchCardTitle}>Round D 2carat</p>
            <p className={styles.SearchDateTime}>12-05-2023|10:12AM</p>
          </div>
          <CustomDisplayButton
            displayButtonAllStyle={displayButtonStyles}
            displayButtonLabel="The price of the stones have been changed"
          />
        </div>
      ),
      cardContent: (
        <CustomTable tableData={tableData} tableStyleClasses={tableStyles} />
      ),
    },
    {
      cardId: "2",
      cardActionIcon: EditIcon,
      cardHeader: (
        <div className={styles.headerContainer}>
          <div className={styles.searchHeader}>
            <p className={styles.SearchCardTitle}>Round D 2carat</p>
            <p className={styles.SearchDateTime}>12-05-2023|10:12AM</p>
          </div>
          <CustomDisplayButton
            displayButtonAllStyle={displayButtonStyles}
            displayButtonLabel="The price of the stones have been changed"
          />
        </div>
      ),
      cardContent: (
        <CustomTable tableData={tableData} tableStyleClasses={tableStyles} />
      ),
    },
    {
      cardId: "3",
      cardActionIcon: EditIcon,
      cardHeader: (
        <div className={styles.headerContainer}>
          <div className={styles.searchHeader}>
            <p className={styles.SearchCardTitle}>Round D 2carat</p>
            <p className={styles.SearchDateTime}>12-05-2023|10:12AM</p>
          </div>
          <CustomDisplayButton
            displayButtonAllStyle={displayButtonStyles}
            displayButtonLabel="The price of the stones have been changed"
          />
        </div>
      ),
      cardContent: (
        <CustomTable tableData={tableData} tableStyleClasses={tableStyles} />
      ),
    },
  ];

  //Selecting Specific Checkbox
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

  //Header Data
  const headerData = {
    headerHeading: "Saved Search",
    handleSelectAllCheckbox: handleSelectAllCheckbox,
    searchCount: cardData.length,
    handleSearch: handleSearch,
    searchValue: search,
  };

  return (
    <>
      {/* Common CustomSearch Card for Saved Search */}
      <CustomSearchCard
        cardData={cardData}
        checkboxHandle={handleClick}
        isChecked={isCheck}
        cardStyles={cardStyles}
        footerButtonData={footerButtonData}
        headerData={headerData}
        handleSuggestionClick={handleSuggestionClick}
        suggestions={suggestions}
      />
    </>
  );
};

export default SavedSearch;
