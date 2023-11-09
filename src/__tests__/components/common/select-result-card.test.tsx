import React from 'react';
import { render } from '@testing-library/react';
import CustomSearchResultCard from '@components/common/search-result-card';
import Image from 'next/image';
jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: ({
      src,
      alt,
      width,
      height,
      ...rest
    }: {
      src: string;
      alt: string;
      width: number;
      height: number;
      // Add more specific types for other props if needed
      // ...rest: SomeType;
    }) => <Image src={src} alt={alt} width={width} height={height} {...rest} />,
  };
});
describe('CustomSearchResultCard', () => {
  const cardData = {
    cardId: '1',
    stone: 'Diamond',
    cardHeader: 'Card Header',
    cardDescription: 'Card Description',
    cardContent: 'Card Content',
  };

  test('renders card with provided data', () => {
    const { getByText } = render(
      <CustomSearchResultCard cardData={cardData} />
    );

    expect(getByText(/Card Header/i)).toBeInTheDocument();
    // expect(getByText(/Card Description/i)).toBeInTheDocument();
    expect(getByText(/Card Content/i)).toBeInTheDocument();
  });

  // test("calls handleCardAction when icon is clicked", () => {
  //   const handleCardActionMock = jest.fn();
  //   const { getByAltText } = render(
  //     <CustomSearchResultCard
  //       cardData={cardData}
  //       handleCardAction={handleCardActionMock}
  //     />
  //   );

  //   fireEvent.click(getByAltText("edit"));
  //   expect(handleCardActionMock).toHaveBeenCalledWith("Diamond");
  // });
});
