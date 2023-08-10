import { CustomSearchCard } from "@/components/Common/search-card";
import React from "react";
import style from "./previous-search.module.scss";
import EditIcon from "../../../public/assets/icons/edit.svg";
import { CustomDisplayButton } from "@/components/Common/Buttons/display-button/display-button";
import { CustomTable } from "@/components/Common/table/table";

const PreviousSearch = () => {
  // Style classes and variables
  const displayButtonStyles = {
    displayLabelStyle: style.SearchButtonLabel,
    displayButtonStyle: style.SearchButtonStyle,
  };
  const tableStyles = {
    tableHeaderStyle: style.tableHeader,
    tableBodyStyle: style.tableBody,
  };
  const cardStyles = {
    cardContainerStyle: style.searchCardContainer,
  };

  // Sample data
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
  let checkboxData = [
    {
      id: 1,
      checked: false,
    },
  ];
  const cardData = [
    {
      cardActionIcon: EditIcon,
      cardHeader: (
        <div className={style.headerContainer}>
          <div className={style.searchHeader}>
            <p className={style.SearchCardTitle}>Round D 2carat</p>
            <p className={style.SearchDateTime}>12-05-2023|10:12AM</p>
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
      cardActionIcon: EditIcon,
      cardHeader: (
        <div className={style.headerContainer}>
          <div className={style.searchHeader}>
            <p className={style.SearchCardTitle}>Round D 2carat</p>
            <p className={style.SearchDateTime}>12-05-2023|10:12AM</p>
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

  return (
    <>
      <CustomSearchCard
        cardData={cardData}
        checkboxData={checkboxData}
        cardStyles={cardStyles}
      />
    </>
  );
};

export default PreviousSearch;
