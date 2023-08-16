"use-client";
import CustomSearchResultCard, {
  ICardDataProps,
  ISearchCardStyleProps,
} from "../search-result-card";
import React from "react";
import { CustomCheckBox } from "../checkbox";
import { CustomFooter } from "../footer";
import CustomHeader from "../header";
import { ToggleButton } from "../toggle";

//footer buttonData interfrace
export interface IfooterButtonData {
  id: number;
  displayButtonLabel: string;
  style: string;
}

interface ISearchCardProps {
  cardData: ICardDataProps[];
  cardStyles: ISearchCardStyleProps;
  footerButtonData?: IfooterButtonData[];
  checkboxHandle?: (e: any) => void;
  isChecked: string[];
  handleSelectAllCheckbox: (e: any) => void;
  headerHeading?: string;
}

export const CustomSearchCard: React.FC<ISearchCardProps> = ({
  cardData,
  cardStyles,
  footerButtonData,
  checkboxHandle,
  isChecked,
  handleSelectAllCheckbox,
  headerHeading,
}) => {
  return (
    <>
      <ToggleButton />
      <div className="container min-h-screen flex flex-col ">
        {/* Custom Header */}
        <div className="sticky top-0 bg-solitairePrimary mt-3">
          <CustomHeader
            handleSelectAllCheckbox={handleSelectAllCheckbox}
            searchCount={cardData.length}
            heading={headerHeading}
          />
        </div>

        {/* Custom Card and Checkbox map */}
        <div className="flex-grow overflow-y-auto" key={headerHeading}>
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
