"use client";
import React from "react";

import Image, { StaticImageData } from "next/image";
import style from "./search-result-card.module.scss";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@components/ui/card";

export interface ISearchCardStyleProps {
  cardContainerStyle?: string;
  cardHeaderContainerStyle?: string;
  cardHeaderTextStyle?: string;
  cardTitleStyle?: string;
  cardActionIconStyle?: string;
}

export interface ICardDataProps {
  cardId: string;
  stone?: string;
  cardHeader: React.ReactNode;
  cardActionIcon?: StaticImageData;
  cardDescription?: React.ReactNode;
  cardContent: React.ReactNode;
  // cardCheckbox: React.ReactNode;
}
export interface IImageContainerProps {
  cardData: ICardDataProps;
  overriddenStyles?: ISearchCardStyleProps;
  handleCardAction?: (stone: string) => void;
  defaultCardPosition?: boolean;
}

const CustomSearchResultCard: React.FC<IImageContainerProps> = (
  card: IImageContainerProps
) => {
  const {
    cardHeader,
    cardActionIcon,
    cardDescription,
    cardContent,
    stone = "",
    cardId,
  } = card.cardData;
  const {
    overriddenStyles = {},
    handleCardAction = () => {},
    defaultCardPosition = true,
  } = card;
  const {
    cardContainerStyle,
    cardHeaderContainerStyle,
    cardHeaderTextStyle,
    cardTitleStyle,
    cardActionIconStyle,
  } = overriddenStyles;

  const handleClickEvent = (event: any) => {
    event.stopPropagation();
    handleCardAction(cardId);
  };
  return (
    <>
      <div className={`flex ${style.mainContainer}`}>
        {/* <div>{cardCheckbox}</div> */}
        <Card
          className={`${style.cardContainer} ${cardContainerStyle}`}
          data-testid={`card-${cardId}`}
        >
          <CardHeader
            className={`${style.cardHeaderContainer} ${cardHeaderContainerStyle}`}
          >
            <div className={`${style.cardHeaderText} ${cardHeaderTextStyle}`}>
              <CardTitle className={`${style.cardTitle} ${cardTitleStyle}`}>
                {cardHeader}
              </CardTitle>
              <CardDescription>{cardDescription}</CardDescription>
              {!defaultCardPosition && <CardContent>{cardContent}</CardContent>}
            </div>
            <CardDescription
              className={`${style.cardDescription} ${cardDescription}`}
            >
              {cardDescription}
            </CardDescription>
          </CardHeader>

          {defaultCardPosition && <CardContent>{cardContent}</CardContent>}
        </Card>
        {cardActionIcon && (
          <Image
            src={cardActionIcon}
            alt={"edit"}
            onClick={handleClickEvent}
            className={`${style.cardActionIcon} ${cardActionIconStyle}`}
          />
        )}
      </div>
    </>
  );
};

export default CustomSearchResultCard;
