'use client';
import React from 'react';

import Image, { StaticImageData } from 'next/image';
import style from './compare-stones.module.scss';
import { Card, CardHeader, CardContent } from '@components/ui/card';

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
  cardHeader?: React.ReactNode;
  cardActionIcon?: StaticImageData;
  cardDescription?: React.ReactNode;
  cardContent?: React.ReactNode;
  // cardCheckbox: React.ReactNode;
}
export interface IImageContainerProps {
  cardData: ICardDataProps;
  overriddenStyles?: ISearchCardStyleProps;
  handleCardAction?: (stone: string) => void;
  defaultCardPosition?: boolean;
}

const CustomCompareStones: React.FC<IImageContainerProps> = (
  card: IImageContainerProps
) => {
  const { cardActionIcon, cardContent, cardId } = card.cardData;
  const { overriddenStyles = {}, handleCardAction = () => {} } = card;
  const {
    cardContainerStyle,
    cardHeaderContainerStyle,
    cardHeaderTextStyle,
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
              {cardActionIcon && (
                <Image
                  src={cardActionIcon}
                  alt={'edit'}
                  onClick={handleClickEvent}
                  className={`${style.cardActionIcon} ${cardActionIconStyle}`}
                />
              )}
            </div>
          </CardHeader>

          <CardContent>{cardContent}</CardContent>
        </Card>
      </div>
    </>
  );
};

export default CustomCompareStones;
