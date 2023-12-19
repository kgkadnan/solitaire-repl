import React from 'react';
import Image, { StaticImageData } from 'next/image';
import style from './search-result-card.module.scss';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@components/ui/card';

export interface ISearchCardStyleProps {
  cardContainerStyle?: string;
  cardHeaderContainerStyle?: string;
  cardTitleStyle?: string;
  cardActionIconStyle?: string;
}

export interface ICardDataProps {
  id: string;
  stone?: string;
  cardHeader: React.ReactNode;
  cardActionIcon?: StaticImageData;
  cardDescription?: React.ReactNode;
  cardContent: React.ReactNode;
  unBlurHeader?: React.ReactNode;
}

export interface IImageContainerProps {
  cardData: ICardDataProps;
  overriddenStyles?: ISearchCardStyleProps;
  handleCardAction?: (stone: string) => void;
  defaultCardPosition?: boolean;
  blurContent?: React.ReactNode;
}

const CustomSearchResultCard: React.FC<IImageContainerProps> = (
  card: IImageContainerProps
) => {
  const {
    cardHeader,
    cardActionIcon,
    cardDescription,
    cardContent,
    id,
    unBlurHeader
  } = card.cardData;
  const {
    overriddenStyles = {},
    handleCardAction = () => {},
    defaultCardPosition = true,
    blurContent
  } = card;
  const {
    cardContainerStyle,
    cardHeaderContainerStyle,
    cardTitleStyle,
    cardActionIconStyle
  } = overriddenStyles;

  const handleClickEvent: React.MouseEventHandler<HTMLImageElement> = event => {
    event.stopPropagation();
    handleCardAction(id);
  };

  return (
    <div className={`flex ${style.mainContainer} `}>
      <Card
        className={`${style.cardContainer} ${cardContainerStyle} ${cardHeaderContainerStyle}  `}
        data-testid={`card-${id}`}
      >
        <CardHeader className={`${style.cardHeaderContainer} `}>
          <div className={`${style.cardHeaderText} `}>
            <CardTitle className={`${style.cardTitle} ${cardTitleStyle} `}>
              {unBlurHeader!}
              <div className={`${style.cardTitle} ${cardTitleStyle}`}>
                {' '}
                {cardHeader}
              </div>
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
          alt={'edit'}
          onClick={handleClickEvent}
          className={`${style.cardActionIcon} ${cardActionIconStyle}`}
        />
      )}
    </div>
  );
};

export default CustomSearchResultCard;
