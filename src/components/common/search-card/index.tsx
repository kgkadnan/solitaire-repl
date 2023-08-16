"use-client";
import CustomSearchResultCard, {
  ICardDataProps,
  ISearchCardStyleProps,
} from "@components/Common/search-result-card";
import React from "react";
import { CustomFooter, IfooterButtonData } from "../footer";
import CustomHeader, { IheaderData } from "../header";
import { CustomCheckBox } from "@components/Common/checkbox";

interface ISearchCardProps {
  cardData: ICardDataProps[];
  cardStyles: ISearchCardStyleProps;
  footerButtonData?: IfooterButtonData[];
  checkboxHandle?: (e: any) => void;
  isChecked: string[];
  headerData?: IheaderData;
}

export const CustomSearchCard: React.FC<ISearchCardProps> = ({
  cardData,
  cardStyles,
  footerButtonData,
  checkboxHandle,
  isChecked,
  headerData,
}) => {
  return (
    <>
      <div className="container min-h-screen flex flex-col ">
        {/* Custom Header */}
        <div className="sticky top-0 bg-solitairePrimary mt-3">
          <CustomHeader data={headerData} />
        </div>

        {/* Custom Card and Checkbox map */}
        <div
          className="flex-grow overflow-y-auto"
          key={headerData?.headerHeading}
        >
          {cardData.map((items) => {
            return (
              <div className="flex mt-6" key={`${items.cardId}`}>
                <CustomCheckBox
                  data={items.cardId}
                  onClick={checkboxHandle}
                  isChecked={isChecked}
                />
                <CustomSearchResultCard
                  cardData={items}
                  overriddenStyles={cardStyles}
                  defaultCardPosition={false}
                />
              </div>
            );
          })}
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
