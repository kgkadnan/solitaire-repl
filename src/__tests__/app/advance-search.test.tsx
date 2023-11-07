import React, { ClassAttributes, ImgHTMLAttributes } from 'react';
import { render } from '@testing-library/react';
import AdvanceSearch from '@/app/search-result/advance-search/page';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement>
  ) => <img {...props} />,
}));

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
