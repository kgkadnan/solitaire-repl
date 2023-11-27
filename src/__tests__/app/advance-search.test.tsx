import React from 'react';
import { render } from '@testing-library/react';

import Image from 'next/image';
import AdvanceSearch from '@/app/search/form/form';

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

describe('Advance Search Page', () => {
  test('renders Advance Search Page', () => {
    const { getByText } = render(<AdvanceSearch />);
    const headerElement = getByText('Search Diamonds');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders Advance Search Page', () => {
    const { getByText } = render(<AdvanceSearch />);
    const headerElement = getByText('Your Selection:');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders Advance Search Page', () => {
    const { getByText } = render(<AdvanceSearch />);
    // Assert the presence of key UI elements
    expect(getByText(/search diamonds/i)).toBeInTheDocument();
    expect(getByText(/your selection/i)).toBeInTheDocument();
  });
});
