import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomSearchResultCard, {
  IImageContainerProps,
} from '@/components/common/search-result-card';

// Mock the next/image package
jest.mock('next/image', () => ({
  __esModule: true,
  default: () => <div>Image Component</div>,
  StaticImageData: {},
}));

describe('CustomSearchResultCard', () => {
  const mockCardData: IImageContainerProps['cardData'] = {
    cardId: '123',
    cardHeader: 'Card Header',
    cardContent: 'Card Content',
  };

  test('renders CustomSearchResultCard component', () => {
    const { getByText } = render(
      <CustomSearchResultCard cardData={mockCardData} />
    );

    expect(getByText('Card Header')).toBeInTheDocument();
    expect(getByText('Card Content')).toBeInTheDocument();
  });

  test('renders content in default position when defaultCardPosition is true', () => {
    const { getByText } = render(
      <CustomSearchResultCard
        cardData={mockCardData}
        defaultCardPosition={true}
      />
    );

    expect(getByText('Card Content')).toBeInTheDocument();
  });

  test('renders content in non-default position when defaultCardPosition is false', () => {
    const { getByText } = render(
      <CustomSearchResultCard
        cardData={mockCardData}
        defaultCardPosition={false}
      />
    );

    expect(getByText('Card Content')).toBeInTheDocument();
  });
});
