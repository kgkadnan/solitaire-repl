"use-client";
import CustomSearchResultCard, {
  ICardDataProps,
  ISearchCardStyleProps,
} from "@/components/Common/search-result-card";
import React from "react";
import { CustomCheckBox } from "@/components/Common/checkbox";
import { CustomFooter } from "../footer";
import CustomHeader from "../header";

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
  checkboxHandle?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: any;
  handleSelectAllCheckbox: (e: any) => void;
}

export const CustomSearchCard: React.FC<ISearchCardProps> = ({
  cardData,
  cardStyles,
  footerButtonData,
  checkboxHandle,
  isChecked,
  handleSelectAllCheckbox,
}) => {
  return (
    <>
      <div className="container min-h-screen flex flex-col ">
        {/* Custom Header */}
        <div className="sticky top-0 bg-solitairePrimary mt-3">
          <CustomHeader
            handleSelectAllCheckbox={handleSelectAllCheckbox}
            searchCount={cardData.length}
          />
        </div>

        {/* Custom Card and Checkbox map */}
        <div className="flex-grow overflow-y-auto">
          {cardData.map((items, index) => {
            return (
              <>
                <div className="flex mt-6" key={index}>
                  <CustomCheckBox
                    data={items.cardId}
                    onclick={checkboxHandle}
                    isChecked={isChecked}
                  />
                  <CustomSearchResultCard
                    cardData={items}
                    overriddenStyles={cardStyles}
                    defaultCardPosition={false}
                  />
                </div>
              </>
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
