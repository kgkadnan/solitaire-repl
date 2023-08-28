import React, { ClassAttributes, ImgHTMLAttributes } from 'react';
import { fireEvent, render } from '@testing-library/react';
import AdvanceSearch from '@app/advance-search/page';
import { CustomSelectionButton } from '@/components/common/buttons/selection-button';

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

  test('clicking button invokes the click handler', () => {
    const handleClick = jest.fn(); // Mock click handler function
    const { getByText } = render(
      <CustomSelectionButton
        selectionButtonLabel="Test Button"
        handleClick={handleClick}
      />
    );

    const buttonElement = getByText('Test Button');
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1); // Verify the function was called once
  });
});
