"use-client";
import CustomSearchResultCard, {
  ICardDataProps,
  ISearchCardStyleProps,
} from "@/components/Common/search-result-card";
import React from "react";
import { CheckboxItem, CustomCheckBox } from "@/components/Common/checkbox";

interface ISearchCardProps {
  cardData: ICardDataProps[];
  checkboxData: CheckboxItem[];
  cardStyles: ISearchCardStyleProps;
}

export const CustomSearchCard: React.FC<ISearchCardProps> = ({
  cardData,
  checkboxData,
  cardStyles,
}) => {
  return (
    <>
      <div className="container">
        {cardData.map((items, index) => {
          return (
            <div className="flex" key={index}>
              <CustomCheckBox data={checkboxData} />
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
