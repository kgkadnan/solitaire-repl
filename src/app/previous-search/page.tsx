"use-client";
import CustomSearchResultCard from "@/components/Common/search-result-card";
import React from "react";
import EditIcon from "../../../public/assets/icons/edit.png";
import style from "./previous-search.module.scss";
import { CustomDisplayButton } from "@/components/Common/Buttons/display-button/display-button";
import { CustomTable } from "@/components/Common/table/table";
import { CustomCheckBox } from "@/components/Common/checkbox";

const PrevioudSearch = () => {
  interface ICardData {
    cardhandleIcon: string;
    cardHeader: React.ReactNode;
    cardContent: React.ReactNode;
  }

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
  const checkboxStyles = {
    checkbox: style.checkboxStyle,
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

  const demoCardData = [
    {
      cardhandleIcon: EditIcon,
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
      cardhandleIcon: EditIcon,
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
      <div className="container">
        {demoCardData.map((items, index) => {
          return (
            <div className="flex" key={index}>
              <CustomCheckBox data={checkboxData} style={checkboxStyles} />
              <CustomSearchResultCard
                cardData={items}
                overriddenStyles={cardStyles}
                defaultCardPosition={false}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PrevioudSearch;
