"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import Image, { StaticImageData } from "next/image";
import Edit from "../../../../public/assets/icons/edit.svg";
import style from "./search-result-card.module.scss";

interface ISearchCardStyleProps {
  cardContainerStyle?: string;
  cardHeaderContainerStyle?: string;
  cardHeaderTextStyle?: string;
  cardTitleStyle?: string;
  cardActionIconStyle?: string;
}

interface ICardDataProps {
  stone?: string;
  cardHeader: React.ReactNode;
  cardActionIcon?: StaticImageData;
  cardDescription?: React.ReactNode;
  cardContent: React.ReactNode;
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
    cardActionIcon = Edit,
    cardDescription,
    cardContent,
    stone = "",
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

  return (
    <Card className={`${style.cardContainer} ${cardContainerStyle}`}>
      <CardHeader
        className={`${style.cardHeaderContainer} ${cardHeaderContainerStyle}`}
      >
        <div className={`${style.cardHeaderText} ${cardHeaderTextStyle}`}>
          <CardTitle className={`${style.cardTitle} ${cardTitleStyle}`}>
            {cardHeader}
          </CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
          {!defaultCardPosition && <CardContent>{cardContent}</CardContent>}
          {!defaultCardPosition && (
            <Image
              src={cardActionIcon}
              alt={"edit"}
              onClick={() => {
                handleCardAction(stone);
              }}
              className={`${style.cardActionIcon} ${cardActionIconStyle}`}
            />
          )}
        </div>
        <CardDescription
          className={`${style.cardDescription} ${cardDescription}`}
        >
          {cardDescription}
        </CardDescription>
      </CardHeader>

      {defaultCardPosition && <CardContent>{cardContent}</CardContent>}
      {defaultCardPosition && (
        <Image
          src={cardActionIcon}
          alt={"edit"}
          onClick={() => {
            handleCardAction(stone);
          }}
          className={`${cardActionIconStyle}`}
        />
      )}
    </Card>
  );
};

export default CustomSearchResultCard;
