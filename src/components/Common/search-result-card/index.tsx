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
import Edit from "../../../../public/assets/icons/edit.png";
import style from "./search-result-card.module.scss";

interface ISearchCardStyleProps {
  cardContainerStyle?: string;
  cardHeaderContainerStyle?: string;
  cardHeaderTextStyle?: string;
  cardTitleStyle?: string;
  cardActionIconStyle?: string;
  cardIconStyle?: string;
}

interface ICardDataProps {
  stone?: string;
  cardIcon?: StaticImageData;
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
    cardIcon = Edit,
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
    cardIconStyle,
    cardActionIconStyle,
  } = overriddenStyles;

  return (
    <Card className={`${style.cardContainer} ${cardContainerStyle}`}>
      <CardHeader
        className={`${style.cardHeaderContainer} ${cardHeaderContainerStyle}`}
      >
        <div className={`${style.cardHeaderText} ${cardHeaderTextStyle}`}>
          <CardTitle className={`${style.cardTitle} ${cardTitleStyle}`}>
            <Image
              src={cardIcon}
              alt={"card"}
              className={`${style.cardIcon} ${cardIconStyle}`}
            />
            {cardHeader}
          </CardTitle>
          {!defaultCardPosition && <CardContent>{cardContent}</CardContent>}
          <Image
            src={cardActionIcon}
            alt={"edit"}
            onClick={() => {
              handleCardAction(stone);
            }}
            className={`${style.cardActionIcon} ${cardActionIconStyle}`}
          />
        </div>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      {defaultCardPosition && <CardContent>{cardContent}</CardContent>}
    </Card>
  );
};

export default CustomSearchResultCard;
