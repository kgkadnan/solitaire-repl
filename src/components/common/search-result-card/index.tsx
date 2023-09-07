import React from 'react';
import Image, { StaticImageData } from 'next/image';
import style from './search-result-card.module.scss';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@components/ui/card';
import { CustomDisplayButton } from '../buttons/display-button';

export interface ISearchCardStyleProps {
  cardContainerStyle?: string;
  cardHeaderContainerStyle?: string;
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
  unBlurHeader?: React.ReactNode;
}

export interface IImageContainerProps {
  cardData: ICardDataProps;
  overriddenStyles?: ISearchCardStyleProps;
  handleCardAction?: (stone: string) => void;
  defaultCardPosition?: boolean;
  isBlur?: boolean;
}

const CustomSearchResultCard: React.FC<IImageContainerProps> = (
  card: IImageContainerProps
) => {
  const {
    cardHeader,
    cardActionIcon,
    cardDescription,
    cardContent,
    stone = '',
    cardId,
    unBlurHeader
  } = card.cardData;
  const {
    overriddenStyles = {},
    handleCardAction = () => {},
    defaultCardPosition = true,
    isBlur = false, // Default value is set to false
  } = card;
  const {
    cardContainerStyle,
    cardHeaderContainerStyle,
    cardTitleStyle,
    cardActionIconStyle,
  } = overriddenStyles;

  const handleClickEvent = (event: any) => {
    event.stopPropagation();
    handleCardAction(cardId);
  };

  return (
    <>
      <div
        className={`flex ${style.mainContainer} ${
          isBlur && style.cardContainerWithContent
        }`}
      >
        <Card
          className={`${style.cardContainer} ${cardContainerStyle} ${cardHeaderContainerStyle}  `}
          data-testid={`card-${cardId}`}
        >
          <CardHeader className={`${style.cardHeaderContainer} `}>
           
            <div
              className={`${style.cardHeaderText} `}
            >
              
              <CardTitle className={`${style.cardTitle} ${cardTitleStyle} `}>
                 { unBlurHeader!}
               <div className={`${style.cardTitle} ${cardTitleStyle} ${
                isBlur ? style.blur : '' // Apply blur class if isBlur is true
              }`}> {cardHeader}</div>
              </CardTitle>
              <CardDescription className={`${
                isBlur ? style.blur : '' // Apply blur class if isBlur is true
              }`}>{cardDescription}</CardDescription>
              {!defaultCardPosition && <CardContent>{cardContent}</CardContent>}
            </div>
            <CardDescription
              className={`${style.cardDescription} ${cardDescription} ${
                isBlur ? style.blur : '' // Apply blur class if isBlur is true
              }`}
            >
              {cardDescription}
            </CardDescription>
          </CardHeader>

          {defaultCardPosition && <CardContent 
          className={`${
            isBlur ? style.blur : '' // Apply blur class if isBlur is true
          }`}
          >{cardContent}</CardContent>}
        </Card>
        {isBlur && (
          <>
            <div className={style.floatingContent}>
              {/* Content that appears above the blurred card */}
              <div className={style.blurCardMainContainer}>
                <div className={style.blurCardContent}>
                  <p>Out of Stock</p>
                  <CustomDisplayButton
                    displayButtonLabel="View Similar Stone"
                    displayButtonAllStyle={{
                      displayButtonStyle: style.filled,
                      displayLabelStyle: style.ViewSimilarStoneLabel,
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {cardActionIcon && (
          <Image
            src={cardActionIcon}
            alt={'edit'}
            onClick={handleClickEvent}
            className={`${style.cardActionIcon} ${cardActionIconStyle}`}
          />
        )}
      </div>
    </>
  );
};

export default CustomSearchResultCard;
